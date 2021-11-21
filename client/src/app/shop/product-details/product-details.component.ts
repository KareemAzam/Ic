import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IProduct} from '../../shared/Models/product';
import {ShopService} from '../shop.service';
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: IProduct;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.shopService
      .getProduct(Number(this.activatedRoute.snapshot.paramMap.get('id')))
      .subscribe(
        (response) => {
          this.product = response;
          this.breadcrumbService.set('@productDetails', response.name)
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
