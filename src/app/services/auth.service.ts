import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, collection, Firestore, getDoc, addDoc , getDocs, deleteDoc} from "firebase/firestore";
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { from, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseDatabase: any;

  constructor(
    private auth: Auth, 
    private router: Router) {
      this.currentUser= localStorage.getItem('currentUser') || null;
    }
    isLoading = false;
    currentUser : any;
    db = getFirestore();
    async registerUser(email: string, password: string, nombre: string) {
      try {
        //User creation
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        //user call(email, nombre, contrasena)
        const user = userCredential.user;
        
        //user ref(call user by email)
        const userRef = doc(this.db, `users/${user.email}`);

        await setDoc(userRef, {
          email: user.email,
          nombre: nombre
        });
        
        // detail must be added in the addRecipe or addProducts(codeBar).
        const recipes = collection(this.db, `users/${user.email}/recipes`);
        const products = collection(this.db, `users/${user.email}/productos`);

        await setDoc(doc(recipes, "placeholder"), { placeholder: true });
        await setDoc(doc(products, "placeholder"), { placeholder: true });

      } catch (error) {
        //user registration error
        throw error;
      }
    }


    async loginUser(email: string, password: string): Promise<any> {
      this.isLoading = true;
      try {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;
        
        // Actualizar el estado del usuario actual
        this.currentUser = user.email;
        localStorage.setItem('currentUser', this.currentUser);
    
        this.router.navigate(['/starter-tab/recipes']);
        return user; 
      } catch (error) {
        throw error; 
      } finally {
        this.isLoading = false;
      }
    }
  /**Obtiene la informacion del usuario mediante el email */
  async getUserInfo(email: string) {
    const userRef = doc(this.db, `users/${email}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      //User doesnt exist
      return null;
    }
  }

  /**Metodo que valida si el usario esta logeado */
  isLoggedIn(): boolean {
    //Llama a metodo initializeauth
    const user = this.initializeauth();
    return user !== null;  
  }

  // Method  logOut 
  logout() {
    this.auth.signOut().then(async () => {
      try {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          await GoogleAuth.signOut(); 
          console.log('cerro sesión con Google');
        }
      } catch (error) {
        console.log(error);
      } finally {
        localStorage.removeItem('googleUser');
        localStorage.removeItem('currentUser');
        this.currentUser = null; 
        this.isInitialized = false;
        this.router.navigate(['/loginoptions']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  private isInitialized: boolean = false;
  authen: boolean = false;
  initializeauth() {
    const savedUser = localStorage.getItem('currentUser'); //carga usuario guardado
    if (savedUser) {
      this.currentUser = savedUser; //restaurar estado
      console.log('Usuario restaurado desde localStorage:', this.currentUser);
    }
  
    this.auth.onAuthStateChanged((user) => {
      if (this.isInitialized) return;
      this.isInitialized = true;
  
      if (user) {
        this.currentUser = user.email;
        localStorage.setItem('currentUser', this.currentUser);
        console.log('Logueado con Firebase:', this.currentUser);
        this.router.navigate(['/starter-tab/recipes']);
      } else {
        console.log('Usuario no logueado');
        this.router.navigate(['/loginoptions']);
      }
    });
  }
  

  async addRecipe(email: string, tiempo: number, titulo: string, ingredientes: string, preparacion: string, imagen: string, visibilidad: string){
    try {
      const user = await this.getUserInfo(email);

      if(!user){
        console.log('user no existe');
      }

      const recipesAdd = collection(this.db,`users/${email}/recipes` );

      await addDoc(recipesAdd, {
        tiempo,
        titulo,
        ingredientes,
        preparacion,
        imagen,
        visibilidad,
        fav: false,
      });

      console.log('reseta add');
    } catch (error) {
      console.log('no se pudo');
    }
  }

  async getUserRecipes(email: string) {
    try {
      // Verifica si el usuario existe primero
      const user = await this.getUserInfo(email);
      if (!user) {
        console.log('El usuario no existe.');
        return null;
      }
  
      // Obtiene la lista de recetas del usuario
      const recipesRef = collection(this.db, `users/${email}/recipes`);
      const recipesSnapshot = await getDocs(recipesRef);
  
      //mapea los documentos de recetas en un array
      const recipes = recipesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      return recipes;
    } catch (error) {
      console.log('Error al obtener recetas');
      return [];
    }
  }
  getCurrentUserEmail()  {
    return this.currentUser;
  }

  /**Recuperacion de contraseña con metodo firebase */
  resetPass(email:string): Promise<void>{
    return sendPasswordResetEmail(this.auth, email);
  }

  //**Metodo para obtener las global recipes (recetas publicas agregadas por los usuarios) */
 async getGlobalRecipes(): Promise<any[]> {
    const globalRecipesCol = collection(this.db, 'globalRecipes');
    const snapshot = await getDocs(globalRecipesCol);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  updateGlobalRecipe(recipe: any): Observable<any> {
    if (!recipe.id) {
      console.error('No se puede actualizar la receta, falta el ID.');
      return of(null); // Evita errores si no hay ID
    }
  
    const recipeDoc = doc(this.db, `globalRecipes/${recipe.id}`);
    return from(setDoc(recipeDoc, { fav: recipe.fav }, { merge: true }));
  }

  /**CRUD RECETAS */
  async deleteRecipe(email: string, recipeId: string): Promise<void> {
    try {
      const recipeDocRef = doc(this.db, `users/${email}/recipes/${recipeId}`);
      await deleteDoc(recipeDocRef); // Eliminaael documento
      console.log('Receta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la receta:', error);
      throw error;
    }
  }

  
}
