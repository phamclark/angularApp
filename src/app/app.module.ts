import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';

//Routes
import { AppRoutingModule } from './app-routing.module';
import { OrderService } from './shared/order.service';

import { FormsModule } from "@angular/forms";

//Material
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './shared/item.service';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents:[OrderItemsComponent],

  providers: [OrderService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
