import { Component, Input } from "@angular/core";
import { SalesSKU } from "../../models/salesSku";

@Component({
  selector: "app-sales-sku-form",
  templateUrl: "./sales-sku-form.component.html",
  styleUrls: ["./sales-sku-form.component.scss"],
})
export class SalesSkuFormComponent {
  @Input() salessku!: SalesSKU;
  @Input() currentStep!: number;
  constructor() {}
}
