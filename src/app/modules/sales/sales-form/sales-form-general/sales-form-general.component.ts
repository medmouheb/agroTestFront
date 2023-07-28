import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Sales } from '../../models/sales';
import { SalesService } from '../../service/sales.service';

@Component({
  selector: 'app-sales-form-general',
  templateUrl: './sales-form-general.component.html',
  styleUrls: ['./sales-form-general.component.scss']
})
export class SalesFormGeneralComponent implements OnInit {
  @Input() sales!: Sales;
  addform: FormGroup;
  fieldControl: FormControl;
  constructor(private sharedService: SharedService, private salesService:SalesService) {}

  names: Array<String> = [];
  codes: Array<String> = [];
  ngOnInit(): void {
    this.initForm();
    this.salesService.findAll().subscribe(data=>{
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })

  }
  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,
     
      Validators.pattern(/^[a-zA-Z]+$/)
    ]);
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
      
      ]),
      name: new FormControl("", [
        Validators.required,
      
      ]),
      Payment_Term: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      type: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
    });
    // console.log("====================================");
    // console.log(" add form :", this.addform);
    // console.log("====================================");
  }
  geValues(event) {
    // console.log("====================================");
    // console.log("event :", event);
    // console.log("====================================");

    // console.log("====================================");
    // console.log("le formulaire :", this.addform);
    // console.log("====================================");

    // console.log(this.sales.code);
    // console.log(this.sales.name);
    // console.log(
    //   "this.sales.code.length",
    //   this.sales.code.toString().length >= 5
    // );
    // console.log(
    //   this.sales.code != null &&
    //     this.sales.code != "" &&
    //     this.division.name != null &&
    //     this.division.name != "" &&
    //     this.division.code.toString().length >= 5 &&
    //     this.division.name.toString().length >= 3
    // );
    if (
      this.addform.value.code != null &&
      this.addform.value.code != "" &&
      this.addform.value.name != null &&
      this.addform.value.name != "" &&this.fieldControl.status !="INVALID"
      

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;

  isBlurDCisvalid() {
    if(this.sales.code==undefined){
      this.DCisvalid = true;
    }
    else if (this.sales.code.toString().length < 1) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {
    if ((this.sales.name==undefined)||(this.fieldControl.status =="INVALID")){
      console.log("ok")
      this.DNisvalid = true;
    }
   else if (this.sales.name.toString().length < 1) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

 

  

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlSpeciesType: string): boolean {
    const control = this.addform.controls[controlSpeciesType];
    return control.invalid && (control.dirty || control.touched);
  }


  generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  newSeggestions = ""
  dispotruename = false

  existname() {
    console.log(this.names.indexOf(this.sales.name) != -1,"aa::",this.sales.name)
    if (this.names.indexOf(this.sales.name) != -1) {
      this.dispotruename = true
      this.newSeggestions = "chose " + this.sales.name + this.generateRandomCode() + " or " + this.sales.name + this.generateRandomCode() + " or " + this.sales.name + this.generateRandomCode() + " or " + this.sales.name + this.generateRandomCode()
    } else {
      this.dispotruename = false
    }
  }
  existcodeIsvalid = false
  existcode() {

    if (this.codes.indexOf((this.sales.code+"")) != -1) {
      this.existcodeIsvalid = true
    } else {
      this.existcodeIsvalid = false
    }
  }

}
