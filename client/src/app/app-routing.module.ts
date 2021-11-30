import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TestErrorComponent} from './core/test-error/test-error.component';
import {NotFoundComponent} from './core/not-found/not-found.component';
import {ServerErrorComponent} from './core/server-error/server-error.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'test-error', component: TestErrorComponent, data: {breadcrumb: 'Test Error'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {
    path: 'shop',
    loadChildren: () =>
      import('./shop/shop.module').then((mod) => mod.ShopModule), data: {breadcrumb: 'Shop'}
  },
  {
    path: 'basket',
    loadChildren: () =>
      import('./basket/basket.module').then((mod) => mod.BasketModule), data: {breadcrumb: 'basket'}
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((mod) => mod.CheckoutModule),
    data: {breadcrumb: 'Checkout'},
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
