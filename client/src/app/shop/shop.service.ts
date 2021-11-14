import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/Models/brand';
import { IPagination } from '../shared/Models/pagination';
import { IType } from '../shared/Models/type';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/Models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getProduct(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId != 0)
      params = params.append('brandId', shopParams.brandId.toString());
    if (shopParams.typeId != 0)
      params = params.append('typeId', shopParams.typeId.toString());

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageIndex);
    params = params.append('pageSize', shopParams.pageSize);
    return this.http
      .get<IPagination>(this.baseUrl + 'products?', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  getBrand() {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getType() {
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}
