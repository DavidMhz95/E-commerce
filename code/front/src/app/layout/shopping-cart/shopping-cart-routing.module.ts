import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart-checkout/shopping-cart-checkout.component';
import { CartGuardService } from 'src/app/shared/cart-guard.service';


const routes: Routes = [{
  path: '',
  component: ShoppingCartComponent,
  children: [
    { path: 'checkout', component: ShoppingCartCheckoutComponent, canActivate: [CartGuardService] },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
