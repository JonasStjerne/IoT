import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './_pages/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  // { path: 'checkout-sell', component: CheckoutSellComponent },
  // { path: 'checkout-buy', component: CheckoutBuyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
