import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderItem } from './order-item.model';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems : OrderItem[];
  constructor(private httpClient: HttpClient) { }

  addOrUpdateOrder(){
    var orderItem = [...this.orderItems];
    orderItem.map((p, i)=>{
      orderItem[i].OrderItemId = i;
      orderItem[i].OrderId = i;
    });

    var body = {
      ...this.formData,
      OrderItems : orderItem
    };
    debugger
    return this.httpClient.post( environment.apiURL + '/Restaurant/AddOrEditOrder', body).toPromise();
  }

  getOrderList(){
    return this.httpClient.get(environment.apiURL + '/Restaurant/GetAllIOrder').toPromise();
  }
}
