import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private auth: AuthService, private modalCtrl: ModalController, private router: Router) {}

  submitRecipe() {
    const email = this.auth.getCurrentUserEmail();
    if (email && this.recipe.titulo && this.recipe.tiempo) {
      this.auth.addRecipe(email, this.recipe.tiempo, this.recipe.titulo, this.recipe.ingredientes, this.recipe.preparacion)
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

  /**
   * 
   * @returns onImageSelected(event: Event) {
    const fileInput = (event.target as HTMLInputElement);
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        this.recipe.imagen = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
   */


  navRecipes(){
    return this.router.navigate(['/starter-tab/recipes']);
  }
}
