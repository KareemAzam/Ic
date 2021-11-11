import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/Models/brand';
import { IProduct } from '../shared/Models/product';
import { IType } from '../shared/Models/type';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  selected = 'Alphabetical';
  products: IProduct[] = [];
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  constructor(private shopeService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopeService.getProduct().subscribe(
      (response) => {
        this.products = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBrands() {
    this.shopeService.getBrand().subscribe(
      (response) => {
        this.brands = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopeService.getType().subscribe(
      (response) => {
        this.types = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
