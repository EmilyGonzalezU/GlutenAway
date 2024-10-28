import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.scss'],
})
export class AddNewRecipeComponent {

  recipe = {
    titulo: '',
    tiempo: '',
    ingredientes: '',
    preparacion: '',
    imagen: ''
  };

  imagePreview: string | ArrayBuffer | null = null;

  constructor(private modalCtrl: ModalController, private router: Router) {}

  submitRecipe() {
    if (this.recipe.titulo && this.recipe.tiempo) {
      this.modalCtrl.dismiss(this.recipe);
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onImageSelected(event: Event) {
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


  navRecipes(){
    return this.router.navigate(['/starter-tab/recipes']);
  }
}
