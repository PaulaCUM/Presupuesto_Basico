import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  // Creamos la variable Budget para guardar en ella el valor del presupuesto que esta en Service
  Budget = 0;

  /* En caso de necesitar que el valor de presupuesto guardado en Service se pueda ver y utilizar
  en el HTML, se puede cambiar "private" por "public" y de esa manera ir al HTML y llamar
  la varible como "_presupuestoService.presupuesto" */
  constructor (private _presupuestoService: PresupuestoService, private router: Router) { }

  ngOnInit(): void {
    /* Debido a que los datos de "presupuesto" no se almacenan en ninguna parte
    al refrescar la pagina el valor vuelve a cero, por lo que se agrega el condicional
    que dice, que si el presupuesto es igual a 0, entonces redirija desde la pagina "gastos"
    al componente "ingresarPresupuesto" para que se vuelva a ingresar el valor */
    if(this._presupuestoService.presupuesto === 0){
      this.router.navigate(['/ingresarPresupuesto'])
    }
    this.Budget = this._presupuestoService.presupuesto;
    console.log(this._presupuestoService.presupuesto)
  }
}
