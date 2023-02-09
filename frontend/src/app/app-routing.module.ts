import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { CreateUserComponent } from './_pages/create-user/create-user.component';
import { HomeComponent } from './_pages/home/home.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { RegisterHubComponent } from './_pages/register-hub/register-hub.component';
import { SignInComponent } from './_pages/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'home/add-hub',
    component: RegisterHubComponent,
    canActivate: [AuthGuard],
  },
  // TODO make 404 not found page
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
