import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { validateTokenGuard } from '../guards/validate-token.guard';
import { AdmiComponent } from './admi/admi.component';

const routes: Routes = [
  {
    path: '',
    children : [
        {
            path : '',
            component : AdmiComponent 
        }
    ],
    canActivate: [validateTokenGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
