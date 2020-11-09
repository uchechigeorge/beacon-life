import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizerPipe } from './sanitizer.pipe';



@NgModule({
  declarations: [
    SanitizerPipe
  ],
  exports: [
    SanitizerPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedPipesModule { }
