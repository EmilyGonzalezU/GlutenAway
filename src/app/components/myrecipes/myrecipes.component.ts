import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { RefresherCustomEvent } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-myrecipes',
  templateUrl: './myrecipes.component.html',
  styleUrls: ['./myrecipes.component.scss'],
})
export class MyrecipesComponent implements OnInit {

  recipes: any[] = [];
  loading: boolean = false; 
  isPopoverOpen = false; 
  selectedRecipe: any = null;
  popoverEvent: any = null;

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService, private loadingController: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadRecipes();
  }
  
  
  async loadRecipes() {
    this.loading = true; 
    const email = this.authService.getCurrentUserEmail();
    console.log(email)
    if (email) {
      try {
        this.recipes = await this.authService.getUserRecipes(email) || [];
      } catch (error) {
        console.error('Error al cargar recetas:', error);
      } finally {
        this.loading = false;
      }
    } else {
      console.log('No hay usuario autenticado');
      this.loading = false; 
    }
  }
  

  async doRefresh(event: RefresherCustomEvent) {
    await this.loadRecipes(); 
    event.target.complete(); 
  }

  presentPopover(event: any, receta: any) {
    this.popoverEvent = event; 
    this.selectedRecipe = receta; 
    this.isPopoverOpen = true;
  }
  openOptions(receta: any) {
    this.selectedRecipe = receta; 
    this.isPopoverOpen = true; 
  }
  closePopover() {
    this.isPopoverOpen = false;
  }

  async deleteRecipe(recipe: any) {
    const email = this.authService.getCurrentUserEmail();
  
    if (!email) {
      console.error('No hay usuario autenticado.');
      return;
    }
  
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que quieres eliminar la receta "${recipe.titulo}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.authService.deleteRecipe(email, recipe.id);
              // Actualiza la lista de recetas
              this.recipes = this.recipes.filter(r => r.id !== recipe.id);
              console.log('Receta eliminada');
              this.closePopover();
            } catch (error) {
              console.error('Error al eliminar la receta:', error);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  isModalOpen = false;
  openRecipe: any = null;
  setOpen(isOpen: boolean, recipe: any = null) {
    this.isModalOpen = isOpen;
    this.openRecipe = recipe;
  }

  modalRestart() {
    this.isModalOpen = false;
    this.openRecipe = null;
  }

  /**Modificacion de receta */
  async saveRecipe() {
    try {
      const email = this.authService.getCurrentUserEmail();
      await this.authService.updateRecipe(email, this.selectedRecipe);
      console.log('Receta actualizada con éxito');
      this.setEditOpen(false);
      this.loadRecipes(); // Recargar las recetas para ver los cambios
    } catch (error) {
      console.error('Error al actualizar la receta.');
    }
  }
  
  isEditModalOpen=false;

  async editRecipe(recipe: any) {
    this.closePopover(); 
    this.selectedRecipe = recipe; 
    console.log('Receta seleccionada para edición:', this.selectedRecipe); 
    this.cdr.detectChanges(); 
    this.setEditOpen(true); 
  }
  setEditOpen(isOpen: boolean) {
    this.isEditModalOpen = isOpen;
  }
}
