import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmiComponent } from './admi/admi.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdmiComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProtectedModule { }
