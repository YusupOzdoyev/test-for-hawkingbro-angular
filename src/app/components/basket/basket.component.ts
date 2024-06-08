import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/products';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent {
  private ProductService =  inject(ProductsService);
  inBasket: IProduct[];
  total = 0;
  inBasketSubscription: Subscription;
  
  constructor(){this.inBasketSubscription = this.ProductService.getProductsToBasket().subscribe((data) => this.inBasket = data)}
 
  add(item: IProduct) {
    item.Quantity += 1;
  }
  remove(item: IProduct) {
    if(item.Quantity === 1) {
      this.ProductService.removeProductFromBasket(item.Id).subscribe(() => {
        let idx = this.inBasket.findIndex((data) => data.Id === item.Id)
        this.inBasket.splice(idx, 1)
      })
    } else {
      item.Quantity -= 1;
    }
  }
  deleteFromBasket(item: IProduct) {
    this.ProductService.removeProductFromBasket(item.Id).subscribe(() => {
      let idx = this.inBasket.findIndex((data) => data.Id === item.Id)
      this.inBasket.splice(idx, 1)
    })
  }
  removeAll() {
    this.inBasket = [];
  }
  getTotalCost(){
      const initialValue = 0;
      this.total = this.inBasket.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.Price * currentValue.Quantity),
    initialValue,
    );
    console.log(this.total)
  }
}
