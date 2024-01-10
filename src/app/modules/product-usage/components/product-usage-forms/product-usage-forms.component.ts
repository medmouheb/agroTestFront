import { Component, Input, OnInit } from "@angular/core";
import { ProductUsage } from "../../model/product-usage";

@Component({
  selector: "app-product-usage-forms",
  templateUrl: "./product-usage-forms.component.html",
  styleUrls: ["./product-usage-forms.component.scss"],
})
export class ProductUsageFormsComponent implements OnInit {
  @Input() camp!: ProductUsage;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
