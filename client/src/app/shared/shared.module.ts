import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderTotalsComponent} from './components/order-totals/order-totals.component';
import {MaterialModule} from "../material.module";

@NgModule({
  declarations: [
    OrderTotalsComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    OrderTotalsComponent
  ]
})
export class SharedModule {
}
