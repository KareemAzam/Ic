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
    private activatedRout: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    this.shopService
      .getProduct(Number(this.activatedRout.snapshot.paramMap.get('id')))
      .subscribe(
        (product) => {
          this.product = product;
          this.breadcrumbService.set('@productDetails', product.name)
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
