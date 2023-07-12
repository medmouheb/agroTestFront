import { Component, Input, OnInit } from '@angular/core';
import { Division } from '../../../models/division';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';
import { Willaya } from 'app/modules/willaya/models/willaya';

@Component({
  selector: 'app-division-from-localisation',
  templateUrl: './division-from-localisation.component.html',
  styleUrls: ['./division-from-localisation.component.scss']
})
export class DivisionFromLocalisationComponent implements OnInit {
  wilayas:Array<Willaya>=[]

  @Input() division!:Division
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

  })[0]
  this.division.wilayaName=wil.name
  this.division.wilayaCode=wil.code


}
minIphone: boolean = false
isBlur3() {
  if ((this.division.phone.toString().length <12 )|| (this.division.phone.toString().length > 13)) {
    this.minIphone = true;
  } else {
    this.minIphone = false;
  }
}
}
