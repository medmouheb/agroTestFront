import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { SalesSKU } from 'app/modules/sales-sku/models/salesSku';
import { SalesService } from 'app/modules/sales/service/sales.service';

@Component({
  selector: 'app-sales-sku-form-general',
  templateUrl: './sales-sku-form-general.component.html',
  styleUrls: ['./sales-sku-form-general.component.scss']
})
export class SalesSkuFormGeneralComponent implements OnInit {
  @Input() salessku!: SalesSKU;
  addform: FormGroup;
  saless:any
  fieldControl: FormControl;
  constructor(private sharedService: SharedService, private salesservice:SalesService) {}


  ngOnInit(): void {
    if (this.salessku == undefined) this.salessku = { sailorNameSku: "", sailorCode: "" };
    this.initForm();
    this.getallsales()
  }
  dvendor:boolean=false
  isBlur5(){
    if((this.salessku.sailorCode=="")||(this.salessku.sailorCode==undefined)){
      this.dvendor=true
    }else {
      this.dvendor=false
  
    }
  }
  getallsales(){
    this.salesservice.findAll().subscribe({
      next: (result) => { this.saless = result; console.log("8==", this.saless) },
      error: (error) => console.error(error),
    });
}
  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,
     
      Validators.pattern(/^[ a-zA-Z ]*$/),
    ]);
    this.addform = new FormGroup({
      sailorCodeSku: new FormControl(null, [
        Validators.required,
       
      ]),
      sailorNameSku: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[ a-zA-Z ]*$/),
      ]),
      sailorCode: new FormControl(null, [
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

    console.log(this.salessku.sailorCode);
    console.log(this.salessku.sailorNameSku);
    console.log(
   
    );
   
    if (
      this.salessku.sailorCode != null &&
      this.salessku.sailorCode != "" &&
      this.salessku.sailorNameSku != null &&
      this.salessku.sailorNameSku != "" &&
      this.salessku.sailorCode.toString().length >= 1 &&this.fieldControl.status !="INVALID"&&
      this.salessku.sailorNameSku.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  minIstrueCode: boolean = false;
  isBlur() {
    if (this.salessku.sailorCode ==undefined){
      this.minIstrueCode = true;

    }else 
    if (this.salessku.sailorCode.toString().length == 0 && this.salessku.sailorCode == "") {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  isBlur3() {
    if ((this.fieldControl.value == '')||(this.fieldControl.value == undefined)) {
      this.minIstrueName2 = false

    }
  }
  minIstrueName2: boolean = false
  isBlur2() {
    if (this.fieldControl.status=="INVALID"){
      this.minIstrueName2 = true

    }
    else if(this.fieldControl.status=="VALID") {
      this.minIstrueName2 = false

    }
  }
  get f() {
    return this.addform.controls;
  }
  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched|| control.invalid);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched|| control.invalid);
  }
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {

    if (this.salessku.sailorCodeSku==undefined) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }
  isBlurDNisvalid() {
 
    if (this.salessku.sailorNameSku==undefined) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }

}
