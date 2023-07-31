import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CurrencyService } from "app/modules/currency/services/currency.service";
import { Currency } from "../../../models/currency";

@Component({
  selector: "app-currency-form-general",
  templateUrl: "./currency-form-general.component.html",
  styleUrls: ["./currency-form-general.component.scss"],
})
export class CurrencyFormGeneralComponent implements OnInit {
  @Input() currency!: Currency;
  addform: FormGroup;
  fieldControl: FormControl;
  fieldControl2: FormControl;
  constructor(private sharedService: SharedService, private cuurencyserv:CurrencyService) {}

  ngOnInit(): void {
    if (this.currency == undefined) this.currency = { name: "", code: "" };
    this.initForm();
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  
  blur1(){
    if (this.currency.code==null){
  this.dispotrueCode = false

    }
  }
  exist(){
    console.log(this.currency.code)
    this.cuurencyserv.findbycode(this.currency.code).subscribe(data=>{
      console.log(data)
if (data!=null){
  this.dispotrueCode = true


}else{
  this.dispotrueCode = false

}

    },error=>{console.log(error.status)
    if (error.status==404){
  this.dispotrueCode = false

    }})

  }
 
  // generateRandomCode() {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let code = '';
  //   for (let i = 0; i < 4; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     code += characters.charAt(randomIndex);
  //   }
  //   return code;
  // }

  newSeggestions = ""

  existname(){
this.cuurencyserv.findbyName(this.currency.name).subscribe(data=>{
      console.log(data)
if (data!=null){
   this.dispotruename = true

 //  this.newSeggestions = "chose " + this.currency.name + this.generateRandomCode() + " or " + this.currency.name + this.generateRandomCode() + " or " + this.currency.name + this.generateRandomCode() + " or " + this.currency.name + this.generateRandomCode()

 }else{
  this.dispotruename = false

 }

    },error=>console.log(error))

  }
  initForm() {
   
    this.fieldControl2 = new FormControl('', [
      Validators.required
    ]);
    this.addform = new FormGroup({
      code: new FormControl(null, [
        Validators.required,
       
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      Countryname: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      Countrcode: new FormControl(null, [
        Validators.required,
       
      ]),
      Digitalcode: new FormControl(null, [
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

    console.log(this.currency.code);
    console.log(this.currency.name);
    console.log(
      "this.currency.code.length",
      this.currency.code.toString().length >= 5
    );
    console.log(
      this.dispotrueCode==false&&this.dispotruename==false&&
      this.currency.code != null &&
        this.currency.code != "" &&
        this.currency.name != null &&
        this.currency.name != "" &&
        this.currency.code.toString().length >= 1 &&
        this.currency.name.toString().length >= 1
    );
    if (
      this.dispotrueCode==false&&this.dispotruename==false&&
      this.currency.digitalcode!= null &&
      this.currency.digitalcode != "" &&
      this.currency.countrycode != null &&
      this.currency.countrycode != "" &&
      this.currency.countryname != null &&
      this.currency.countryname != "" &&
      this.currency.code != null &&
      this.currency.code != "" &&
      this.currency.name != null &&
      this.currency.name != "" &&
      this.currency.code.toString().length >= 1 && 
      this.currency.name.toString().length >= 1 ){
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
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
   DCouisvalid: boolean = false;
   DCgiisvalid: boolean = false;
  DNcouisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  minIstrueName2: boolean = false

  minIstrueName3: boolean = false
 
  isBlurDCouisvalid() {
    if (this.currency.digitalcode== undefined){
      this.DCgiisvalid = true 
    }else
    if (this.currency.digitalcode.toString().length < 0) { this.DCgiisvalid = true }
    else {
      this.DCgiisvalid = false
    }
  }
  isBlurDCjiisvalid() {
    if (this.currency.countrycode== undefined){
      this.DCouisvalid = true 
    }else
    if (this.currency.countrycode.toString().length < 0) { this.DCouisvalid = true }
    else {
      this.DCouisvalid = false
    }
  } 
  isBlurDCisvalid() {
    if (this.currency.code== undefined){
      this.DCisvalid = true 
    }else
    if (this.currency.code.toString().length < 0) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }
  isBlurDNouisvalid() {
    if (this.currency.countryname== undefined){
      this.DNcouisvalid = true 
    }else
    
    if (this.currency.countryname.toString().length < 0) { this.DNcouisvalid = true }
    else {
      this.DNcouisvalid = false
    }
  }
  isBlurDNisvalid() {
    if (this.currency.name== undefined){
      this.DNisvalid = true 
    }else
    
    if (this.currency.name.toString().length < 0) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }



  
 
}
