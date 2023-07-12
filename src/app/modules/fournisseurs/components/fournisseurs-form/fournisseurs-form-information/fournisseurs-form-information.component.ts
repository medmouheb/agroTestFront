import { Component, OnInit, Input } from '@angular/core';
import { Fournisseur } from '../../../models/fournisseur.model';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';

@Component({
  selector: 'app-fournisseurs-form-information',
  templateUrl: './fournisseurs-form-information.component.html',
  styleUrls: ['./fournisseurs-form-information.component.scss']
})
export class FournisseursFormInformationComponent implements OnInit {

  @Input() fournisseur!: Fournisseur
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
  this.fournisseur.wilayaName=wil

}


}
