import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    public service: ItemService
  ) { }

  ngOnInit() {
    this.service.getItemList().then(resp=>{
      debugger
      this.itemList = resp as Item[];
    });
    this.formData = {
      ItemId : 0,
      OrderId : this.data.OrderId,
      ItemName : '',
      OrderItemId : 0,
      Price : 0,
      Quantity : 0,
      Total : 0
    }
  }

  UpdatePrice(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.Price  = 0;
    }
    else{
      this.formData.Price = this.itemList[ctrl.selectedIndex].price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex].name;
      this.formData.ItemId = ctrl.selectedIndex;
    }
  }

  UpdateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }
}
