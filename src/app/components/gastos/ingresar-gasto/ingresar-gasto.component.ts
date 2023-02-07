import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent {

  nombreGasto !: string;
  cantidad !: number;
  formularioIncorrecto !: boolean;
  textoIncorrecto !: string;

  constructor (private _presupuestoService : PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textoIncorrecto = '';
  }

  agregarGasto() {

    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'La cantidad ingresada es mayor al restante';
      return; //Este return evita que el resto del if se siga ejecutando, ya que buscamos detener el proceso debido al error en los datos ingresados
    }

    if(this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre del gasto o Cantidad incorrecta';
    } else {

      // Creamos un objeto con el nombre Gasto y cantidad
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      } // Por convencion, las constantes se escriben en MAYUSCULAS

      // Enviamos el objeto a los suscriptores via subject
      this._presupuestoService.agregarGasto(GASTO);

      // Reseteamos formulario

      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
}
