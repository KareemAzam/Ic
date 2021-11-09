import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/Models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  selected = 'Alphabetical';
  products: IProduct[] = [];
  constructor(private shopeService: ShopService) {}

  ngOnInit(): void {
    this.shopeService.getProduct().subscribe(
      (response) => {
        this.products = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
