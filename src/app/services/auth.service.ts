import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { getFirestore, doc, setDoc, collection, Firestore, getDoc } from "firebase/firestore";
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth, 
    private router: Router) {}

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

      } catch (error) {
        //user registration error
        throw error;
      }
    }


  async loginUser(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
  
      return user; 
    } catch (error) {
      throw error; 
    }
  }

  async getUserInfo(email: string) {
    const userRef = doc(this.db, `users/${email}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      //User doesnt exist
      return false;
    }
  }

  isLoggedIn(): boolean {
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
        this.router.navigate(['/loginoptions']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  authen: boolean = false;
  initializeauth() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('logueado con firebase');
        this.router.navigate(['/starter-tab/recipes']);
      } else {
        const googleUser = localStorage.getItem('googleUser');
        if (googleUser) {
          console.log('logueado con google');
          this.router.navigate(['/starter-tab/recipes']);
        } else {
          console.log('usuario no logueado');
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
