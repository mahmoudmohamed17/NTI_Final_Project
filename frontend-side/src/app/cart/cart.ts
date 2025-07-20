import { Component, OnInit } from '@angular/core';
import { Product } from '../home/product.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  items: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }
}
