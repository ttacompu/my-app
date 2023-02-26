import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit, OnChanges {
  subscription$ = new Subject<void>();

  @Input() id = -1;

  product$: Observable<Product> | undefined;
  product: Product | undefined


  constructor(public authService: AuthService, private route: ActivatedRoute, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.product$ = this.route.data.pipe(
      switchMap(data => { this.product = data['product']; return of(data['product']) })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  buy(product: Product) {
    this.cartService.addProduct(product);
  }

  get productName(): string | undefined {
    console.log(`Get ${this.product?.name}`);
    return this.product?.name;
  }

  get productPrice(): number | undefined {
    console.log(`Get ${this.product?.price}`);
    return this.product?.price;
  }

  changePrice(product: Product, price: number) {
    console.log(product, price);
  }


}
