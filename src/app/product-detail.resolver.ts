import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from './products/product';
import { ProductsService } from './products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<Product> {

  constructor(private productService: ProductsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = Number(route.paramMap.get('id'));
    return this.productService.getProduct(id);
  }
}
