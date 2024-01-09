import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../../models/produit.model';
import { SalesSkuService } from 'app/modules/sales-sku/services/sales-sku.service';
import { SalesSKU } from 'app/modules/sales-sku/models/salesSku';

@Component({
  selector: 'app-produits-form-sales-sku',
  templateUrl: './produits-form-sales-sku.component.html',
  styleUrls: ['./produits-form-sales-sku.component.scss']
})
export class ProduitsFormSalesSkuComponent implements OnInit {
  @Input() produit: Produit = {}

  salesList :Array<SalesSKU>=[]

  constructor( private salesSkuService: SalesSkuService) { }

  ngOnInit(): void {
    if(!this.produit.salesSKU){
      this.produit.salesSKU = {}
    }
    this.salesSkuService.findAll().subscribe(data=>{
      this.salesList=data
      
    })
  }

  setValue(e:any){
     this.produit.salesSKU=  this.salesList.find(el=>{return el.id=e.target.value})

  }



}
