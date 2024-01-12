import { Component, Input, OnInit } from "@angular/core";
import { SalesSKU } from "../../models/salesSku";

@Component({
  selector: "app-sales-sku-form",
  templateUrl: "./sales-sku-form.component.html",
  styleUrls: ["./sales-sku-form.component.scss"],
})
export class SalesSkuFormComponent implements OnInit {
  @Input() salessku!: SalesSKU;
  @Input() currentStep!: number;
  constructor() {}

  ngOnInit(): void {}
}
