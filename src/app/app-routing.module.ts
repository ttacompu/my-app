import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { CheckoutGuard } from './checkout.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], canDeactivate: [CheckoutGuard] },
  {
    path: 'about',
    loadComponent: () => import('./about/about-info/about-info.component').then(c => c.AboutInfoComponent)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
