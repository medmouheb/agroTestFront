import { Component, Input } from "@angular/core";
import { Delivery } from "../../models/delivery";

@Component({
  selector: "app-delivery-form",
  templateUrl: "./delivery-form.component.html",
  styleUrls: ["./delivery-form.component.scss"],
})
export class DeliveryFormComponent {
  @Input() delivery!: Delivery;
  @Input() deliveryStep!: number;
  constructor() {}
}
