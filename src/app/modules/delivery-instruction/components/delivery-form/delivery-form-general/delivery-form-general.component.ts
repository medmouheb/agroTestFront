import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Delivery } from 'app/modules/delivery-instruction/models/delivery';

@Component({
  selector: 'app-delivery-form-general',
  templateUrl: './delivery-form-general.component.html',
  styleUrls: ['./delivery-form-general.component.scss']
})
export class DeliveryFormGeneralComponent implements OnInit {
  @Input() delivery!: Delivery;
  addform: FormGroup;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    if (this.delivery==undefined)this.delivery={
      productType:"", instructiuonCode:""};
      this.infiForm()
      
    }
infiForm(){
  this.addform=new FormGroup({
    productType:new FormControl(null,[ Validators.required]),
    instructiuonCode:new FormControl(null,[ Validators.required]),
    instructiuonName:new FormControl(null,[ Validators.required]),
    notes:new FormControl(null),
    active:new FormControl(null)

  })

  console.log("====================================");
  console.log(" add form :", this.addform);
  

}
setname(){
  console.log("e:",this.delivery.instructiuonCode)
  console.log("e:",this.delivery.instructiuonName)

  switch (this.delivery.instructiuonCode) {
    case "CH":
      this.delivery.instructiuonName = "Check Chick Health"; 
      this.addform.patchValue({instructiuonName:"Check Chick Health"})
      // this.addform.value.instructiuonName= "Check Chick Health";
      break;
    case "RRC":
       this.delivery.instructiuonName = "Remove and replace Culls";
      this.addform.value.instructiuonName= "Remove and replace Culls";

      break;
    case "MPC":
       this.delivery.instructiuonName = "Test Moisture % Before Weighing";
      break;
    case "SW":
       this.delivery.instructiuonName = "Shrink Wrap";
      break;
    case "MCT":
       this.delivery.instructiuonName = "Maintain Constant Temperature";
      break;
    case "ExpD":
       this.delivery.instructiuonName = "Verify Expiry Date on Label";
      break;
  
  }
}
listA:String[]=[]
affichecode:boolean=false
setList(){
  console.log("ll::",this.delivery.productType)
  switch(this.delivery.productType){
    case "Animal":this.listA=["CH","RPC"] ;break ; 
    case "Ingredients":this.listA=["MPC"] ;break ; 
    case "Eggs":this.listA=["SW"] ;break ; 
    case "Vaccines":this.listA=["MCT","ExpD"] ;break ; 
    case"Other":this.affichecode=true; break
  }
}
afficheother:boolean=false 
select(){
  if (this.delivery.productType==='Other'){
    this.afficheother=true 
    this.delivery.productType=''
  }
  else{
    this.afficheother=false  

  }

}
getValue(event){

  console.log("event :", event);
  console.log("le deleverhy :", this.delivery);
  
  console.log("====================================");
    console.log("le formulaire :", this.addform.value);
    if (this.delivery.productType!=null && this.delivery.productType!="null"&&
    this.delivery.instructiuonName!=null&& this.delivery.instructiuonName!=""&&
    this.delivery.instructiuonCode!=null&& this.delivery.instructiuonCode!="null"
     ){
      this.sharedService.setIsActive(true);
     }else {
      this.sharedService.setIsActive(false);
    }


}
get f() {
  return this.addform.controls;
}


  

} 
