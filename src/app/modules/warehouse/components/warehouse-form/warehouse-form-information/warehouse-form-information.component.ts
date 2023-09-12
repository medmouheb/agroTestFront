import { Component, OnInit, Input } from '@angular/core';
import { Warehouse } from '../../../models/warehouse.model';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';
import { cssNumber } from 'jquery';

@Component({
  selector: 'app-warehouse-form-information',
  templateUrl: './warehouse-form-information.component.html',
  styleUrls: ['./warehouse-form-information.component.scss']
})
export class WarehouseFormInformationComponent implements OnInit {

  @Input()
  warehouse: Warehouse = {}
  wilayas:Array<Willaya>=[]
  ok:boolean


  constructor(private sharedService: SharedService,
    private wilayaservice:WillayaService) {}

  ngOnInit(): void {
this.getAllWillaya()
this.lengthPhone(false)
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
emailIsvalid = false

validationEmail() {
  const emailRegex: RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  console.log(this.warehouse.email)
  if (emailRegex.test(this.warehouse.email)) {
    this.emailIsvalid = false;
  console.log(this.warehouse.email)

  }
  else {
  this.emailIsvalid=true
  }

}



lengthPhone(ok:boolean){
  if(this.warehouse.faxNumber.length ==12) {
       ok==true
  }
}

}
  