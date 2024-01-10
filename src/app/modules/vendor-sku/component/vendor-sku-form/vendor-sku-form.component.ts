import { Component, Input, OnInit } from "@angular/core";
import { VendorSKU } from "../../models/vendorsku";

@Component({
  selector: "app-vendor-sku-form",
  templateUrl: "./vendor-sku-form.component.html",
  styleUrls: ["./vendor-sku-form.component.scss"],
})
export class VendorSKUFormComponent implements OnInit {
  @Input() vendorsku!: VendorSKU;
  @Input() currentStep!: number;
  constructor() {}

  ngOnInit(): void {}
}
