import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/Models/brand';
import { IProduct } from '../shared/Models/product';
import { IType } from '../shared/Models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] | undefined;
  brands: IBrand[] | undefined;
  types: IType[] | undefined;
  brandIdSelected: number | undefined;
  typeIdSelected: number | undefined;
  constructor(private shopeService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopeService
      .getProduct(this.brandIdSelected, this.typeIdSelected)
      .subscribe(
        (response) => {
          this.products = response?.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBrands() {
    this.shopeService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this.shopeService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
