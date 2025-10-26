import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReactiveFormsModule, FormGroup],
  imports: [
    CommonModule
  ]
})
export class ModuleModule { }