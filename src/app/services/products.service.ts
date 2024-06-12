import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsToBasket() {
    return this.http.get<IProduct[]>('http://localhost:8080/api/ShoppingCart/products')
  }

  removeProductFromBasket(id: number) {
    return this.http.delete<IProduct>('http://localhost:8080/api/ShoppingCart/products')
  }

}
