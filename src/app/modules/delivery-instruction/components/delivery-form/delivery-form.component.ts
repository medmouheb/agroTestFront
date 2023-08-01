import { Component, Input, OnInit } from '@angular/core';
import { Delivery } from '../../models/delivery';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent implements OnInit {
@Input()delivery! : Delivery
@Input() deliveryStep!:number
  constructor() { }

  ngOnInit(): void {
  }

}
 