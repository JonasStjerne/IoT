import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', component: FrontpageComponent },
  // { path: 'checkout-sell', component: CheckoutSellComponent },
  // { path: 'checkout-buy', component: CheckoutBuyComponent },
  // { path: 'checkout-buy/success', component: CheckoutSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
