import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { MaterialModule } from '../material.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProdutDetailsComponent } from './produt-details/produt-details.component';

@NgModule({
  declarations: [ShopComponent, ProductItemComponent, ProdutDetailsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ShopComponent],
})
export class ShopModule {}
