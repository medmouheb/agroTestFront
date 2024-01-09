import { Component, OnInit, Input } from '@angular/core';
import { Produit } from '../../../models/produit.model';
import { FarmsService } from 'app/modules/farms/services/farms.service';
import { Farm } from 'app/modules/farms/models/farm';
import { error } from 'console';

@Component({
  selector: 'app-produits-form-usage',
  templateUrl: './produits-form-usage.component.html',
  styleUrls: ['./produits-form-usage.component.scss']
})
export class ProduitsFormUsageComponent implements OnInit {
  @Input() produit: Produit = {}

  constructor(private farmsService:FarmsService) { }
  farmList:Array<Farm>=[]
  ngOnInit(): void {
    
    this.farmsService.findAll().subscribe(data=>{
      this.farmList=data
      
    },error=>{
      
    })
  }


  selectVAlue(e:any){
    this.produit.farmCode=e.target.value
  }

}
