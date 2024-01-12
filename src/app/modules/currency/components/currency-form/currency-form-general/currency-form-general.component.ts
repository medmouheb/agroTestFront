import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CurrencyService } from "app/modules/currency/services/currency.service";
import { Currency } from "../../../models/currency";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";

@Component({
  selector: "app-currency-form-general",
  templateUrl: "./currency-form-general.component.html",
  styleUrls: ["./currency-form-general.component.scss"],
})
export class CurrencyFormGeneralComponent implements OnInit {
  @Input() currency!: Currency;
  currencyReplica!: Currency;

  addform: FormGroup;
  fieldControl: FormControl;
  fieldControl2: FormControl;
  constructor(private sharedService: SharedService, private cuurencyserv: CurrencyService, private dialogComponent: DialogComponent) { }
  static = ""
  id = ""
  getstatus() {

    if (this.currency.id) {

      this.static = "update"
      if (this.id != this.currency.id) {
        this.id = this.currency.id
        this.currencyReplica = JSON.parse(JSON.stringify(this.currency))


      }
      this.dialogComponent.setsubmitstatus(true)

      return "update"

    } else if (!this.currency.id) {
      this.static = "create"
      this.geValues('z')
      return "create"

    }
  }
  names: Array<String> = [];
  codes: Array<String> = [];
  ngOnInit(): void {
    if (this.currency == undefined) this.currency = { name: "", code: "" };
    this.initForm();
    this.cuurencyserv.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })

  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false

  blur1() {
    if (this.currency.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    if (this.codes.indexOf((this.currency.code + "")) != -1) {
      if(this.static=="update" ){
        if(this.currency.code == this.currencyReplica.code){
          this.dispotrueCode = false
        }else{
          this.dispotrueCode = true
        }
      }else{
        this.dispotrueCode = true
      }

    } else {
      this.dispotrueCode = false
    }


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

  existname() {
    if (this.names.indexOf((this.currency.name + "")) != -1) {
      if(this.static=="update" ){

        if(this.currency.name == this.currencyReplica.name){
          this.dispotruename = false
        }else{
          this.dispotruename = true
        }
      }else{
        this.dispotruename = true
      }

    } else {
      this.dispotruename = false
    }

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

      ])
    });

  }

  geValues(event) {

    if (
      !!(this.currency.countrcode && this.currency.countryname && this.currency.digitalcode) &&
      this.dispotrueCode == false && this.dispotruename == false &&
      this.currency.digitalcode != null &&
      this.currency.digitalcode != "" &&
      this.currency.countrcode != null &&
      this.currency.countrcode != "" &&
      this.currency.countryname != null &&
      this.currency.countryname != "" &&
      this.currency.code != null &&
      this.currency.code != "" &&
      this.currency.name != null &&
      this.currency.name != "" &&
      this.currency.code.toString().length >= 1 &&
      this.currency.name.toString().length >= 1) {
        this.dialogComponent.setsubmitstatus(true)
      } else {
        this.dialogComponent.setsubmitstatus(false)
      }
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched || control.invalid);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched || control.invalid);
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
    if (this.currency.digitalcode == undefined) {
      this.DCgiisvalid = true
    } else
      if (this.currency.digitalcode.toString().length < 0) { this.DCgiisvalid = true }
      else {
        this.DCgiisvalid = false
      }
  }
  isBlurDCjiisvalid() {
    if (this.currency.countrcode == undefined) {
      this.DCouisvalid = true
    } else
      if (this.currency.countrcode.toString().length < 1) { this.DCouisvalid = true }
      else {
        this.DCouisvalid = false
      }
  }
  isBlurDCisvalid() {
    if (this.currency.code == undefined) {
      this.DCisvalid = true
    } else
      if (this.currency.code.toString().length < 0) { this.DCisvalid = true }
      else {
        this.DCisvalid = false
      }
  }
  isBlurDNouisvalid() {
    if (this.currency.countryname == undefined) {
      this.DNcouisvalid = true
    } else

      if (this.currency.countryname.toString().length < 0) { this.DNcouisvalid = true }
      else {
        this.DNcouisvalid = false
      }
  }
  isBlurDNisvalid() {
    if (this.currency.name == undefined) {
      this.DNisvalid = true
    } else

      if (this.currency.name.toString().length < 0) { this.DNisvalid = true }
      else {
        this.DNisvalid = false
      }
  }

  codeIsvalid = false

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.currency.code)) {
      this.codeIsvalid = false;
      this.sharedService.setIsActive(false);

    }
    else {
      this.codeIsvalid = true
      this.sharedService.setIsActive(true);

    }

  }



}
