import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'app/modules/company/services/shared.service';
import { VendorSKU } from 'app/modules/vendor-sku/models/vendorsku';
import { VendorskuService } from 'app/modules/vendor-sku/serivce/vendorsku.service';
import { Produit } from '../../../models/produit.model';

@Component({
  selector: 'app-produits-form-vendor-sku',
  templateUrl: './produits-form-vendor-sku.component.html',
  styleUrls: ['./produits-form-vendor-sku.component.scss']
})
export class ProduitsFormVendorSkuComponent implements OnInit {
  @Input() produit: Produit = {}
  vendors = [
    "Vendor 1",
    "Vendor 2",
    "Vendor 3"
  ]
  vendorsku: Array<VendorSKU> = []
  constructor(private sharedService: SharedService, private vendorskuservice: VendorskuService) { }


  ngOnInit(): void {
    if (!this.produit.vendorSKU) {
      this.produit.vendorSKU = {}
    }
    this.getAllvendor()
  }
  getAllvendor() {
    this.vendorskuservice.findAll().subscribe({
      next: (result) => { this.vendorsku = result; console.log("2==", result) },
      error: (error) => console.error(error),
    })
  }
  fourn: any
  selectVAlue(e: any) {
    console.log("3==", e.target.value)
    this.vendorskuservice.findById(e.target.value).subscribe({
      next: (result) => {
        this.fourn = result; console.log("2==", result)
        this.produit.vendorSKU = this.fourn
        console.log("5==", this.produit.vendorSKU)
      },
      error: (error) => console.error(error),

    })
    //   let t=this.vendorsku.filter(el=>{return el.vendorSKUCode==e.target.value})[0]
    this.produit.vendorSKU = this.fourn
    //  console.log("3==",t)
    //  e.target.value=t.vendorSKUName


    //   console.log("4==",t)

  }

}
