import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailResolver } from '../product-detail.resolver';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {
    path: 'products', component: ProductListComponent, children: [
      {
        path: ':id', component: ProductDetailComponent, resolve: {
          product: ProductDetailResolver
        }
      }
    ]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
