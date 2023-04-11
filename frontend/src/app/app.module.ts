import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiModule } from './_api/api.module';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './_pages/sign-in/sign-in.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { HomeComponent } from './_pages/home/home.component';
import { NotFoundComponent } from './_pages/not-found/not-found.component';
import { CreateUserComponent } from './_pages/create-user/create-user.component';
import { RegisterHubComponent } from './_pages/register-hub/register-hub.component';
import { HubCardComponent } from './_components/hub-card/hub-card.component';
import { HubListComponent } from './_components/hub-list/hub-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HubComponent } from './_pages/hub/hub.component';
import { WorkerCardComponent } from './_components/worker-card/worker-card.component';
import { WorkerListComponent } from './_components/worker-list/worker-list.component';
import { WorkerComponent } from './_pages/worker/worker.component';
import { ActionCardComponent } from './_components/action-card/action-card.component';
import { ActionListComponent } from './_components/action-list/action-list.component';
import { AddActionComponent } from './_pages/add-action/add-action.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    NotFoundComponent,
    CreateUserComponent,
    RegisterHubComponent,
    HubCardComponent,
    HubListComponent,
    HubComponent,
    WorkerCardComponent,
    WorkerListComponent,
    WorkerComponent,
    ActionCardComponent,
    ActionListComponent,
    AddActionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ApiModule.forRoot({ rootUrl: environment.server_base_url }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      progressBar: true,
      closeButton: true,
    }),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
