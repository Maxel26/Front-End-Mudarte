import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ProductosComponent } from './productos/productos.component';
import { PreguntasComponent } from './preguntas/preguntas.component';


//http://localhost:4200

const routes: Routes = [
  { path : '', component : InicioComponent },                 
  { path : 'nosotros', component : NosotrosComponent },          
  { path : 'productos', component : ProductosComponent},    
  { path : 'productos', component : PreguntasComponent},    
  { path : '**', redirectTo : '' }                       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }