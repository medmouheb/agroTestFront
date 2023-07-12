import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { FournisseursService } from 'app/modules/fournisseurs/services/fournisseurs.service';
import { VendorSKU } from 'app/modules/vendor-sku/models/vendorsku';

@Component({
  selector: 'app-vendor-sku-form-general',
  templateUrl: './vendor-sku-form-general.component.html',
  styleUrls: ['./vendor-sku-form-general.component.scss']
})
export class VendorSKUFormGeneralComponent implements OnInit {
  @Input() Vendorsku!: VendorSKU;
  addform: FormGroup;
  fieldControl: FormControl;
  constructor(private sharedService: SharedService,  private fournisseurservice:FournisseursService) {}

  ngOnInit(): void {
    if (this.Vendorsku.vendorCode == undefined){
      console.log(this.Vendorsku)
    }
    this.initForm();
    this.getallfourniss()
  }
  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,
     
      Validators.pattern(/^[a-zA-Z ]*$/),

    ]);
    this.addform = new FormGroup({
      vendorCode: new FormControl(null, [
        Validators.required,
       
      ]),
      vendorSKUName: new FormControl(null, [
        Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
       
      ]),
      vendorSKUCode: new FormControl(null, [
        Validators.required,
       
      ]),
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
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
  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    console.log(this.Vendorsku.vendorSKUCode);
    console.log(this.Vendorsku.vendorSKUName);
    console.log(
      "this.currency.code.length",
     
    );
    console.log(
      this.Vendorsku.vendorSKUCode != null &&
        this.Vendorsku.vendorSKUCode != "" &&
        this.Vendorsku.vendorSKUName != null &&
        this.Vendorsku.vendorSKUName != "" &&
        this.Vendorsku.vendorSKUCode.toString().length >= 1 &&
        this.Vendorsku.vendorSKUName.toString().length >= 1
    );
    if (
      this.Vendorsku.vendorSKUCode != null &&
      this.Vendorsku.vendorSKUCode != "" &&
      this.Vendorsku.vendorSKUName != null &&
      this.Vendorsku.vendorSKUName != "" &&
      this.Vendorsku.vendorSKUCode.toString().length >= 1 &&
      this.Vendorsku.vendorSKUName.toString().length >= 1&&this.fieldControl.status !="INVALID"

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  get f() {
    return this.addform.controls;
  }
  
  minIstrueCode: boolean = false;
  isBlur() {
    if (this.Vendorsku.vendorCode ==undefined){
      this.minIstrueCode = true;

    }else 
    if (this.Vendorsku.vendorCode.toString().length == 0 && this.Vendorsku.vendorCode == "") {
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
    if (this.Vendorsku.vendorSKUCode ==undefined){
      this.DCisvalid = true;

    }else 
    if ((this.Vendorsku.vendorSKUCode.toString().length < 1)||(this.Vendorsku.vendorSKUCode==undefined)) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.Vendorsku.vendorSKUName ==undefined){
      this.DNisvalid = true;

    }else 
    if ((this.Vendorsku.vendorSKUName.toString().length <1)||(this.Vendorsku.vendorSKUName==undefined)
    ) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
  dvendor:boolean=false
  isBlur5(){
    if((this.Vendorsku.vendorCode=="")||(this.Vendorsku.vendorCode==undefined)){
      this.dvendor=true
    }else {
      this.dvendor=false
  
    }
  }
  fournisseurs:any
  getallfourniss(){
    this.fournisseurservice.findAll().subscribe({
      next: (result) => { this.fournisseurs = result; console.log("8==", this.fournisseurs) },
      error: (error) => console.error(error),
    });
}
}
