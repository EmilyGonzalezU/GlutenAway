import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent {
  scannedCode: string = '';
  error: string = '';
  //aCA van los codigos escaneados (para despues compararlos)
  scannedCodes: string[] = [];
  scanning: boolean = false;
  constructor(private recipeService: RecipeService, private barcodeScanner: BarcodeScanner) {}


  startScan() {
    this.scanning = true;
    const options: BarcodeScannerOptions = {
      prompt: 'Escanea el código de barras de tu producto.'
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedCode = barcodeData.text;
      //Almacena el codigo escaneado
      this.scannedCodes.push(barcodeData.text);
      this.error = '';
      this.scanning = false;
      //Control de errores
    }).catch(err => {
      this.error = 'Error: ' + err;
      this.scannedCode = '';
      this.scanning = false;
    });
  }

  stopScan() {
    this.scanning = false; // Permite cerrar la vista de escaneo
  }
  // Metodo para comparar el codigo escaneado con otros valores "Base de datos"
  compareScannedCode(codeToCompare: string): boolean {
    return this.scannedCodes.includes(codeToCompare);
  }

  //Array vacia para almacenar codigos
  code: any[] = [];

  ngOnInit() {
    this.recipeService.getCodeBars().subscribe(
      (data) => {
        this.code = data;
      }
    );
  }

  getProductDetails(code: string) {
    const product = this.code.find(item => item.codigo === code);
    if (product) {
      return {
        nombre: product.producto,
        ingredientes: product.ingredientes.join(', '),
        tieneGluten: product.tieneGluten
      };
    } else {
      return null;
    }
  }
}
