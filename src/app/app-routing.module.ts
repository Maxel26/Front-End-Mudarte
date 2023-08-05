import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PreguntasComponent } from './pages/preguntas/preguntas.component';
import { LoginComponent } from './pages/login/login.component';
import { AdmiComponent } from './protected/admi/admi.component';


//http://localhost:4200

const routes: Routes = [
  { path : '', component : InicioComponent },                 
  { path : 'nosotros', component : NosotrosComponent },          
  { path : 'productos', component : ProductosComponent},    
  { path : 'preguntas', component : PreguntasComponent},   
  { path : 'login', component : LoginComponent},
  {
    path: 'admi',
    loadChildren: () => import( './protected/protected.module' )
      .then( module => module.ProtectedModule )
  },
  { path : '**', redirectTo : '' }                       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }