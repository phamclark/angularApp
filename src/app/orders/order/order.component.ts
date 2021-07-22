import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

//Material
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  constructor(
    public service: OrderService,
    public dialog: MatDialog) 
    { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form? :NgForm) {
    this.service.formData = {
      OrderId : null,
      OrderNo : Math.floor(100000 + Math.random()*900000).toString(),
      CustomerId: 0,
      PMethod:'',
      GTotal: 0
    };

    this.service.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, orderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, orderID}
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }
}
