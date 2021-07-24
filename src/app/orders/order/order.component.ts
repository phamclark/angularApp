import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

//Material
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { ItemService } from 'src/app/shared/item.service';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {

  customerList : Customer[];

  constructor(
    public service: OrderService,
    public itemService: ItemService,
    public customerService: CustomerService,
    public dialog: MatDialog,
    public router: Router,
    public currentRouter: ActivatedRoute) 
    { }

  ngOnInit() {
    let orderId = this.currentRouter.snapshot.paramMap.get('id');
    if(orderId == null){
      this.resetForm();
    }
    else{
      
    }
    this.customerService.getCumstomerList().then(res=>{
      this.customerList = res as Customer[];
    });
  }
  resetForm(form? :NgForm) {
    this.service.formData = {
      OrderId : 0,
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
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.UpdateGTotal();
    });
  }

  UpdateGTotal(){
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr)=>{
      return prev + curr.Total;
    },0);

    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  onSubmit(){
    this.service.addOrUpdateOrder().then(res=>{
      this.resetForm();
    });
  }
}
