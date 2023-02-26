import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartForm = new FormGroup({
    products: new FormArray<FormControl<number>>([])
  });

  cart: Product[] = [];

  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cart = this.cartService.cart;
    this.cart.forEach(() => {
      this.cartForm.controls.products.push(
        new FormControl(1, { nonNullable: true })
      )
    })
  }
}
