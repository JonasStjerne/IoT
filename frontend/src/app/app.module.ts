import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApiModule } from './_api/api.module';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './_pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.server_base_url }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
