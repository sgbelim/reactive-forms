import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CustomersComponent} from './customers/customers/customers.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ReactiveCustomersComponent } from './reactive/reactive-customers/reactive-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    ReactiveCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
