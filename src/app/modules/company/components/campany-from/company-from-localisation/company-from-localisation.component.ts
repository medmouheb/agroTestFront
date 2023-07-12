import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { SharedService } from "app/modules/company/services/shared.service";
import { Company } from "../../../models/comany";
import { Willaya } from "app/modules/willaya/models/willaya";
import { WillayaService } from "app/modules/willaya/services/willaya.service";

@Component({
  selector: "app-company-from-localisation",
  templateUrl: "./company-from-localisation.component.html",
  styleUrls: ["./company-from-localisation.component.scss"],
})
export class CompanyFromLocalisationComponent implements OnInit {
  @Input() camp!: Company;
  addform: FormGroup;
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
  this.camp.wilayaName=wil

}




  initForm() {
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
       
      ]),
      name: new FormControl("", [
        Validators.required,
      
      ]),
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }

  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    this.sharedService.setIsActive(true);
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  minIwillaya: boolean = false

  isBlur() {
    if ((this.camp.wilayaName.toString().length <=0 )|| (this.camp.wilayaName.toString().length > 100)) {
      this.minIwillaya = true;
    } else {
      this.minIwillaya = false;
    }
  }
  minIzipcode: boolean = false

  isBlur2() {
    if ((this.camp.zipCode.toString().length <=0 )|| (this.camp.zipCode.toString().length > 11)) {
      this.minIzipcode = true;
    } else {
      this.minIzipcode = false;
    }
  }
  minIphone: boolean = false

  isBlur3() {
    if ((this.camp.number.toString().length <12 )|| (this.camp.number.toString().length > 13)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }
}
