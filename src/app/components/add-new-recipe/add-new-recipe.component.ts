import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { getFirestore, doc, setDoc, collection, Firestore, getDoc, addDoc , getDocs} from "firebase/firestore";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.scss'],
})
export class AddNewRecipeComponent {
  ingredientesCharCount: number = 0;
  preparacionCharCount: number = 0;
  ingredientesError: boolean = false;
  preparacionError: boolean = false;
  
  recipe = {
    titulo: '',
    tiempo: 0,
    ingredientes: '',
    preparacion: '',
    imagen: '',
    visibilidad: 'privado',
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private auth: AuthService, private modalCtrl: ModalController, private router: Router) {}

  async onImageSelected() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Devuelve la imagen como Data URL
      source: CameraSource.Photos // Accede a la galeria
    });

    this.imagePreview = image.dataUrl as string;
    this.recipe.imagen = image.dataUrl as string;
  }
/**Metodo modificado para la visibilidad, si es privado solo se le agrega a la persona, 
 * si es publico, se le agrega a la persona y al publico
 */
  async submitRecipe() {
    const currentUserEmail = this.auth.getCurrentUserEmail();
    try {
      //Agregar la receta a las recetas del usuario
      const recipesAdd = collection(this.auth.db, `users/${currentUserEmail}/recipes`);
      await addDoc(recipesAdd, {
        tiempo: this.recipe.tiempo,
        titulo: this.recipe.titulo,
        ingredientes: this.recipe.ingredientes,
        preparacion: this.recipe.preparacion,
        imagen: this.imagePreview,
        visibilidad: this.recipe.visibilidad,
      });
      //aca si es publico agrega al autor de la receta
      if (this.recipe.visibilidad === 'publico') {
        const globalRecipesAdd = collection(this.auth.db, 'globalRecipes');
        await addDoc(globalRecipesAdd, {
          tiempo: this.recipe.tiempo,
          titulo: this.recipe.titulo,
          ingredientes: this.recipe.ingredientes,
          preparacion: this.recipe.preparacion,
          imagen: this.imagePreview,
          visibilidad: this.recipe.visibilidad,
          fav: false,
          autor: currentUserEmail,
        });
      }
  
      console.log('Receta creada exitosamente');
    } catch (error) {
      console.log('Error al crear la receta');
    } finally {
      this.closeModal(); 
    }
  }
  


validateInput(field: string) {
  if (field === 'ingredientes') {
    this.ingredientesCharCount = this.recipe.ingredientes.length;
    this.ingredientesError = this.ingredientesCharCount > 300;
  } else if (field === 'preparacion') {
    this.preparacionCharCount = this.recipe.preparacion.length;
    this.preparacionError = this.preparacionCharCount > 500;
  }
}


  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  navRecipes(){
    return this.router.navigate(['/starter-tab/recipes']);
  }
}
