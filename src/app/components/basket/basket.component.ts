import { CommonModule } from '@angular/common';
import { IProduct } from '../../models/products';
import { Component, OnInit, inject } from '@angular/core';
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
export class BasketComponent implements OnInit{
  private ProductService =  inject(ProductsService);
  inBasket: IProduct[];
  total = 0;

  ngOnInit() {
    this.ProductService.getProductsToBasket().pipe()
      .subscribe((data) => {
        this.inBasket = data;
      })
  }

  add(item: IProduct) {
    item.Quantity += 1;
  }
  remove(item: IProduct) {
    if(item.Quantity === 1) {
      this.ProductService.removeProductFromBasket(item.Id).subscribe(() => {
        let idx = this.inBasket.findIndex((data: { Id: number; }) => data.Id === item.Id)
        this.inBasket.splice(idx, 1)
      })
    } else {
      item.Quantity -= 1;
    }
  }
  deleteFromBasket(item: IProduct) {
    this.ProductService.removeProductFromBasket(item.Id).subscribe(() => {
      let idx = this.inBasket.findIndex((data: { Id: number; }) => data.Id === item.Id)
      this.inBasket.splice(idx, 1)
    })
  }
  removeAll() {
    this.inBasket = [];
  }
  getTotalCost(){
      const initialValue = 0;
      this.total = this.inBasket.reduce(
    (accumulator: number, currentValue: { Price: number; Quantity: number; }) => accumulator + (currentValue.Price * currentValue.Quantity),
    initialValue,
    );
    console.log(this.total)
  }
}
