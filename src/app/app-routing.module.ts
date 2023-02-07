import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { IngresarGastoComponent } from './components/gastos/ingresar-gasto/ingresar-gasto.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { IngresarPresupuestoComponent } from './components/ingresar-presupuesto/ingresar-presupuesto.component';

const routes: Routes = [
  // Cuando el usuario ingrese a la ruta original, redireccionar a IngresarPresupuesto
  { path: '', redirectTo: '/ingresarPresupuesto', pathMatch: 'full'},
  // Redireccionar al usuario a los diferentes componentes segun la ruta que ingrese
  { path: 'ingresarPresupuesto', component: IngresarPresupuestoComponent },
  { path: 'gastos', component: GastosComponent },
  // En caso de que escriba una ruta invalida, enviarlo a la pagina de IngresarPresupuesto
  // IMPORTANTE QUE ESTA SEA LA ULTIMA LINEA DE TODAS!!!
  { path: '**', redirectTo: '/ingresarPresupuesto', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
