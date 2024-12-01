import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.scss'],
})
export class AddNewRecipeComponent {

  recipe = {
    titulo: '',
    tiempo: 0,
    ingredientes: '',
    preparacion: '',
    imagen: '',
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

  submitRecipe() {
    const email = this.auth.getCurrentUserEmail();
    if (email && this.recipe.titulo && this.recipe.tiempo) {
      this.auth.addRecipe(email, this.recipe.tiempo, this.recipe.titulo, this.recipe.ingredientes, this.recipe.preparacion, this.recipe.imagen)
        .then(() => {
          this.modalCtrl.dismiss(this.recipe);
        })
        .catch(error => console.error("Error al agregar la receta:", error));
    } else {
      console.log('Usuario no autenticado');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  navRecipes(){
    return this.router.navigate(['/starter-tab/recipes']);
  }
}
