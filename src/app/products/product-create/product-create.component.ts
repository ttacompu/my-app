import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, Observable } from 'rxjs';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  @Output()
  added = new EventEmitter<Product>();

  productForm
  showPriceRangeHint = false;
  products$: Observable<Product[]> | undefined;
  products: Product[] = [];

  constructor(private productsService: ProductsService) {
    this.productForm = new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: Validators.required
      }),
      price: new FormControl<number | undefined>(undefined, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)]
      })
    });

  }


  ngOnInit(): void {

    this.productsService.getProducts().subscribe(x => this.products = x);
    this.products$ = this.name.valueChanges.pipe(map(name => this.products.filter(product => product.name.startsWith(name))))

    this.price.valueChanges.subscribe(price => {
      if (price) {
        this.showPriceRangeHint = price < 1 || price > 10000
      }
    });
  }

  createProduct() {
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm.reset();
      this.added.emit(product);
    });

  }

  get name() { return this.productForm.controls.name }
  get price() { return this.productForm.controls.price }

}
