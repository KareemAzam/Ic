import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IBrand} from '../shared/Models/brand';
import {IPagination} from '../shared/Models/pagination';
import {IType} from '../shared/Models/type';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getProduct(brandId?: number, typeId?: number, sort?: string) {
    let params = new HttpParams();

    if (brandId) params = params.append('brandId', brandId.toString());
    if (typeId) params = params.append('typeId', typeId.toString());
    if (sort) params = params.append('sort', sort);

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
