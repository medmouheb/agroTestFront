import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';

@Component({
  selector: 'app-warehouse-form-information',
  templateUrl: './warehouse-form-information.component.html',
  styleUrls: ['./warehouse-form-information.component.scss']
})
export class WarehouseFormInformationComponent implements OnInit {

  @Input()
  warehouse: Warehouse = {}
  wilayas:Array<Willaya>=[]
  constructor(private sharedService: SharedService,
    private wilayaservice:WillayaService) {}

  ngOnInit(): void {
this.getAllWillaya()
  }

getAllWillaya(){
  this.wilayaservice.findAll().subscribe({
    next: (result) => { this.wilayas = result; console.log("2==", result) },
    error: (error) => console.error(error),
  });
}
selectValue(e:any){
  let wil=this.wilayas.filter(el=>{
    return el.code==e.target.value

  })[0].name
  this.warehouse.wilayaName=wil

}


}
  