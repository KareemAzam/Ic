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
  products?: IProduct[];
  brands?: IBrand[];
  types?: IType[];
  brandIdSelected = 0;
  typeIdSelected = 0;
  sortSelected = 'name';
  sortOption = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  selectedCar: string = '';
  constructor(private shopeService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this.shopeService
      .getProduct(this.brandIdSelected, this.typeIdSelected, this.sortSelected)
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

  onSortSelected(sort: string) {
    this.sortSelected = sort;
    this.getProducts();
  }

  onTest($event: any) {
    console.log($event);
  }
}
