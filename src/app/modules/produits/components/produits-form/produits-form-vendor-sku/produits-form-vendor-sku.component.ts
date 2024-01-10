import { Component, Input, OnInit } from "@angular/core";
import { SharedService } from "app/modules/company/services/shared.service";
import { VendorSKU } from "app/modules/vendor-sku/models/vendorsku";
import { VendorskuService } from "app/modules/vendor-sku/serivce/vendorsku.service";
import { Produit } from "../../../models/produit.model";

@Component({
  selector: "app-produits-form-vendor-sku",
  templateUrl: "./produits-form-vendor-sku.component.html",
  styleUrls: ["./produits-form-vendor-sku.component.scss"],
})
export class ProduitsFormVendorSkuComponent implements OnInit {
  @Input() produit: Produit = {};
  vendors = ["Vendor 1", "Vendor 2", "Vendor 3"];
  vendorsku: Array<VendorSKU> = [];
  constructor(
    private sharedService: SharedService,
    private vendorskuservice: VendorskuService,
  ) {}

  ngOnInit(): void {
    if (!this.produit.vendorSKU) {
      this.produit.vendorSKU = {};
    }
    this.getAllvendor();
  }
  getAllvendor() {
    this.vendorskuservice.findAll().subscribe({
      next: (result) => {
        this.vendorsku = result;
      },
      error: (error) => console.error(error),
    });
  }
  fourn: any;
  selectVAlue(e: any) {
    this.vendorskuservice.findById(e.target.value).subscribe({
      next: (result) => {
        this.fourn = result;
        this.produit.vendorSKU = this.fourn;
      },
      error: (error) => console.error(error),
    });

    this.produit.vendorSKU = this.fourn;
  }
}
