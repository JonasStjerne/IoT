import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { AddActionComponent } from './_pages/add-action/add-action.component';
import { CreateUserComponent } from './_pages/create-user/create-user.component';
import { HomeComponent } from './_pages/home/home.component';
import { HubComponent } from './_pages/hub/hub.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { RegisterHubComponent } from './_pages/register-hub/register-hub.component';
import { SignInComponent } from './_pages/sign-in/sign-in.component';
import { WorkerComponent } from './_pages/worker/worker.component';

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
  { path: 'hub/:id', component: HubComponent, canActivate: [AuthGuard] },
  { path: 'hub/:id/worker/:workerId', component: WorkerComponent, canActivate: [AuthGuard] },
  { path: 'hub/:id/worker/:workerId/add-action', component: AddActionComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
