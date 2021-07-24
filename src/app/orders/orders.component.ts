import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../shared/order.model';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  orderList: any;

  constructor(
    public service: OrderService,
    public router: Router
  ) { }

  ngOnInit() {
    this.service.getOrderList().then(res=>{
      debugger
      this.orderList = res;
    })
  }
  openForEdit(orderId: number){
    this.router.navigate(['/order/edit' + orderId]);
  }
}
