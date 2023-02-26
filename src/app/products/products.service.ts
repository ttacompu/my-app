import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

interface ProductDTO {
  id: number;
  title: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductDTO[]>(this.productsUrl)
      .pipe(
        map(products => products.map(this.convertToProduct))
      )
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.productsUrl}/${id}`).pipe(
      map(product => this.convertToProduct(product))
    )
  }

  addProduct(name: string, price: number): Observable<Product> {
    return this.http.post<ProductDTO>(this.productsUrl, {
      title: name,
      price: price
    }).pipe(
      map(product => this.convertToProduct(product))
    );
  }

  private convertToProduct(product: ProductDTO): Product {
    return {
      id: product.id,
      name: product.title,
      price: product.price
    };
  }
}
