import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css']
})
export class ListarGastoComponent implements OnDestroy, OnInit {

  subscription : Subscription;
  presupuesto : number;
  restante : number;
  listGastos: any[] = [];
  valorBorrado: any[] = [];

  constructor (private _presupuestoService : PresupuestoService, private router: Router) {
    
    this.presupuesto = 0;
    this.restante = 0;

    this.subscription = this._presupuestoService.getGastos().subscribe(data => {
      // console.log(data);
      // Cogemos el restante y le restamos la cantidad que va llegando
      this.restante = this.restante - data.cantidad;
      this.valorBorrado.push(data.cantidad);
      // Agregamos al arreglo el nuevo dato obtenido por el observable
      this.listGastos.push(data);
    })

  }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  aplicarColorRestante () {

    if(this.presupuesto/4 > this.restante) {
      return "alert alert-danger";
    } else if (this.presupuesto/2 > this.restante) {
      return "alert alert-warning";
    } else {
      return "alert alert-secondary";
    }

  }

  borrarGasto(_id: number) {
    if(confirm("Está seguro de querer borrar este gasto?")){      
      this.restante = this.restante + this.valorBorrado[_id];
      this._presupuestoService.restante = this.restante;
      this.listGastos.splice(_id,1)
      this.valorBorrado.splice(_id,1)
    }
  }

  editarGasto (_id: number) {
    let nombre = prompt("Introduce el nuevo nombre del gasto", this.listGastos[_id].nombre);
    let cantidad = prompt("Introduce el nuevo valor del gasto", this.listGastos[_id].cantidad);
    if (nombre && cantidad) {
      this.restante = this.restante + this.valorBorrado[_id] - parseInt(cantidad);
      this._presupuestoService.restante = this.restante;
      this.listGastos[_id] = { nombre: nombre, cantidad: parseInt(cantidad) };
      this.valorBorrado[_id] = parseInt(cantidad);
}
  }

  borrarTodo() {
    if(confirm("Está seguro de querer borrar todos los gastos?")){      
      this._presupuestoService.restante = this.presupuesto;
      this.restante = this.presupuesto;
      this.listGastos = [];
      this.valorBorrado = [];
    }
  }

  Reiniciar () {
    if(confirm("Está seguro de querer reiniciar el presupuesto?")){      
      this.router.navigate(['/ingresarPresupuesto'])
      this.presupuesto = 0;
      this.restante = 0;
      this._presupuestoService.presupuesto = 0;
      this._presupuestoService.restante = 0;
    }
  }


}
