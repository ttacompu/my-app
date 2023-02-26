import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../product';
import { ProductViewService } from '../product-view.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  @Input()
  productNumber: number = 0;
  product$: Observable<Product> = of();

  constructor(private productViewService: ProductViewService) {

  }

  ngOnInit() {
    this.product$ = this.productViewService.getProduct(this.productNumber);
  }

}
