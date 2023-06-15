import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriberListComponent } from './subscriber/list/subscriber-list.component';
import { SubscriberFormComponent } from './subscriber/form/subscriber-form.component';
import { SubscriberDetailsComponent } from './subscriber/details/subscriber-details.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriberListComponent,
    SubscriberFormComponent,
    SubscriberDetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
