import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/Models/pagination';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost;5001/api/';

  constructor(private http: HttpClient) {}

  getProduct() {
    return this.http.get<IPagination>(this.baseUrl + 'products');
  }
}
