import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/Models/brand';
import { IPagination } from '../shared/Models/pagination';
import { IType } from '../shared/Models/type';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<IPagination>(this.baseUrl + 'products?pagesize=50');
  }

  getBrand() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  getType() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
