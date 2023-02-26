import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {
  selectedProduct: Product | null = null;
  products$: Observable<Product[]> = of([]);
  products: Product[] = [];

  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent | undefined;

  constructor(private productService: ProductsService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts().pipe(tap(products => this.products = products));
  }

  buy(name: string) {
    alert(`you buy ${name}`)
  }

  onAdd(product: Product) {
    this.products.push(product);
    this.products$ = of(this.products);
  }

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log("product detail is ", this.productDetail.id);
    }
  }

}
