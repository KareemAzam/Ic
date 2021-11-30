import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from '../../basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRout: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.breadcrumbService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  loadProduct() {
    this.shopService
      .getProduct(Number(this.activatedRout.snapshot.paramMap.get('id')))
      .subscribe(
        (product) => {
          this.product = product;
          this.breadcrumbService.set('@productDetails', product.name);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
