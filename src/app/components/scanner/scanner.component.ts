import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  scannedCode: string = '';
  error: string = '';
  productDetails: any = null; // Detalles del producto escaneado
  code: any[] = []; // Lista de productos

  constructor(private recipeService: RecipeService, private barcodeScanner: BarcodeScanner) {}

  ngOnInit() {
    // Cargar productos desde el servicio
    this.recipeService.getCodeBars().subscribe(
      (data) => {
        this.code = data;
      },
      (err) => {
        this.error = 'Error al cargar la base de datos de productos.';
      }
    );
  }
  scannedProducts: any[] = []; // Historial de productos escaneados

  startScan() {
    const options: BarcodeScannerOptions = {
      prompt: 'Escanea el código de barras de tu producto.'
    };
  
    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.error = '';
      const product = this.getProductDetails(this.scannedCode); // obtiene detalles del producto
  
      if (product) {
        this.productDetails = product;
          const exists = this.scannedProducts.some(p => p.codigo === this.scannedCode);
        if (!exists) {
          this.scannedProducts.push({
            ...product,
            codigo: this.scannedCode
          });
        }
      }
    }).catch(err => {
      this.error = 'Error: ' + err;
      this.scannedCode = '';
      this.productDetails = null;
    });
  }

  getProductDetails(code: string) {
    const product = this.code.find(item => item.codigo === code);
    if (product) {
      return {
        nombre: product.producto,
        ingredientes: product.ingredientes,
        tieneGluten: product.containGluten
      };
    } else {
      this.error = 'Producto no encontrado en la base de datos.';
      return null;
    }
  }
}
