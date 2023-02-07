import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-presupuesto',
  templateUrl: './ingresar-presupuesto.component.html',
  styleUrls: ['./ingresar-presupuesto.component.css']
})
export class IngresarPresupuestoComponent {
  cantidad !: number;
  cantidadIncorrecta !: boolean;

  constructor (private _presupuestoService : PresupuestoService, private router: Router) {
    this.cantidad = 0;
    this.cantidadIncorrecta = false;
  }

  agregar() {
    if(this.cantidad>0){
      // Ocultar letrero de Error
      this.cantidadIncorrecta = false;
      // Guardar en la variable "presupuesto" del otro componente, lo que haya en "cantidad"
      this._presupuestoService.presupuesto = this.cantidad;
      // Guardar en la variable "restante" del otro componente, lo que haya en "cantidad"
      this._presupuestoService.restante = this.cantidad;
      // Redirigir al usuario al componente de gastos
      /* Se usa la "/" para indicar que es la ruta completa (localhost4200/gastos), en caso de no poner la barra, 
      se agregaría al final de la ruta existente la palabra "gastos"(localhost4200/ingresoPresupuesto/gastos) */
      this.router.navigate(['/gastos'])
    } else {
      this.cantidadIncorrecta = true;
    }
  }

}
