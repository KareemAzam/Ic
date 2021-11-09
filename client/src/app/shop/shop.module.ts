import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ShopComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ShopComponent],
})
export class ShopModule {}
