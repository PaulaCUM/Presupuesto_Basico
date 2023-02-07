import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  presupuesto !: number;
  restante !: number;
  /* A los observables se les pone un signo de $ al final o inicio de la variable
  Con este observable vamos a poder compartir informacion entre diferentes componentes
  que se encuentran en diferentes ramas, arboles o jerarquias, y NO son directamente padres e hijos
  SUBJECT es un tipo Observable */
  private gastos$ = new Subject<any>();

  constructor() {
    this.presupuesto = 0;
    this.restante = 0;
   }

  //  Método 1
   agregarGasto(gasto: any) {
    this.restante = this.restante - gasto.cantidad;
    this.gastos$.next(gasto);
   }

   getGastos(): Observable<any> {
    return this.gastos$.asObservable(); // Gastos se comportara como un observable. Se veran reflejados sus cambios
   }
}
