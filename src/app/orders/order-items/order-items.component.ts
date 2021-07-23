import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Item } from 'src/app/shared/item.model';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item.model';
import { OrderService } from 'src/app/shared/order.service';
@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];
  isValid: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    public service: ItemService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.service.getItemList().then(resp=>{
      debugger
      this.itemList = resp as Item[];
    });
    if(this.data.orderItemIndex == null){
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
  else{
    this.formData = Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex])
  }
  }

  UpdatePrice(ctrl){
    if(ctrl.selectedIndex == 0){
      this.formData.Price  = 0;
    }
    else{
      this.formData.Price = this.itemList[ctrl.selectedIndex -1].Price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex -1 ].Name;
      this.formData.ItemId = ctrl.selectedIndex;
    }
    this.UpdateTotal();
  }

  UpdateTotal(){
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm){
    debugger
    if(this.validateForm(form.value)){
      if(this.data.orderItemIndex == null){
        let index = this.orderService.orderItems.findIndex(x=>x.ItemId == form.value.ItemId)
        if(index > -1){
          this.orderService.orderItems[index].Quantity = parseInt(this.orderService.orderItems[index].Quantity.toString()) + parseInt(form.value.Quantity);
          this.orderService.orderItems[index].Total = parseFloat((this.orderService.orderItems[index].Quantity * form.value.Price).toFixed(2));
        }
        else{
          this.orderService.orderItems.push(form.value);
        }
        
      }
      else{
        this.orderService.orderItems[this.data.orderItemIndex] = form.value;
      }
      
      this.dialogRef.close();
    }
  }

  validateForm(formDate: OrderItem){
    this.isValid = true;
    if(formDate.ItemId == 0 || formDate.Quantity == 0){
      this.isValid = false;
    }
    return this.isValid;
  }
}
