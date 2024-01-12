import { Component, Input, OnInit } from "@angular/core";
import { SharedService } from "app/modules/company/services/shared.service";
import { VendorSKU } from "app/modules/vendor-sku/models/vendorsku";
import { VendorskuService } from "app/modules/vendor-sku/serivce/vendorsku.service";
import { Fournisseur } from "../../../models/fournisseur.model";

@Component({
  selector: "app-fournisseurs-form-vendor-sku",
  templateUrl: "./fournisseurs-form-vendor-sku.component.html",
  styleUrls: ["./fournisseurs-form-vendor-sku.component.scss"],
})
export class FournisseursFormVendorSkuComponent implements OnInit {
  @Input() fournisseur!: Fournisseur;
  vendorsku: Array<VendorSKU> = [];
  vendors;
  constructor(
    private sharedService: SharedService,
    private vendorskuservice: VendorskuService,
  ) {}

  ngOnInit(): void {
    if (!this.fournisseur.vendorSKU) {
      this.fournisseur.vendorSKU = {};
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
  selectVAlue(e: any) {
    let t = this.vendorsku.filter((el) => {
      return el.vendorSKUCode == e.target.value;
    })[0];
    this.fournisseur.vendorSKU = t;
    this.fournisseur.vendorSKUcode = t.vendorSKUCode;
    this.fournisseur.vendorSKUname = t.vendorSKUName;
    this.vendors = t.vendorSKUName;
  }
  fourn: VendorSKU;
}
