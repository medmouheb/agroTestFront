import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Currency } from "app/modules/currency/models/currency";
import { CurrencyService } from "app/modules/currency/services/currency.service";
import { FournisseursService } from "app/modules/fournisseurs/services/fournisseurs.service";
import { Fournisseur } from "../../../models/fournisseur.model";

@Component({
  selector: "app-fournisseurs-form-general",
  templateUrl: "./fournisseurs-form-general.component.html",
  styleUrls: ["./fournisseurs-form-general.component.scss"],
})
export class FournisseursFormGeneralComponent implements OnInit {
  @Input() fournisseur!: Fournisseur;
  fournisseurReplica!: Fournisseur;

  fieldControl: FormControl;
  addform: FormGroup;
  cuurencys: Array<Currency> = []
  constructor(private sharedService: SharedService,
    private currencyservice: CurrencyService, private founriserv: FournisseursService) { }
    names: Array<String> = [];
    codes: Array<String> = [];
    static = ""

  ngOnInit(): void {
    this.initForm();
    if (this.fournisseur.code != null) {
      this.sharedService.setIsActive(true);

    }

    this.initForm();
    this.getAllCurrency()

    this.founriserv.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })

    if (this.fournisseur.id) {
      this.static = "update"
      this.fournisseurReplica =  JSON.parse( JSON.stringify(  this.fournisseur))
    } else if (!this.fournisseur.id) {
      this.static = "create"
    }

  }
  getAllCurrency() {
    this.currencyservice.findAll().subscribe({
      next: (result) => (this.cuurencys = result),
      error: (error) => console.error(error),
    });
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.fournisseur.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    if (this.codes.indexOf((this.fournisseur.code + "")) != -1) {
      if(this.static=="update" ){

        if(this.fournisseur.code == this.fournisseurReplica.code){
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



  newSeggestions = ""
  existname() {
    if (this.names.indexOf((this.fournisseur.name + "")) != -1) {
      if(this.static=="update" ){

        if(this.fournisseur.name == this.fournisseurReplica.name){
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


  selectValue(e: any) {

    let wil = this.cuurencys.filter(el => {
      return el.code == e.target.value

    })[0].name
    this.fournisseur.currencyname = wil


  }


  initForm() {


    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,

      ]),
      name: new FormControl("", [
        Validators.required,

      ]),
      type: new FormControl("", [
        Validators.required,

      ]),
      paymentTerm: new FormControl("", [
        Validators.required,

      ]),
      currencyCode: new FormControl("", [
        Validators.required,

      ]),
    });

  }

  geValues(event) {



    if ( this.fournisseur.type && this.fournisseur.code != null && this.fournisseur.code != "" && this.fournisseur.name != null && this.dispotrueCode == false && this.dispotruename == false &&
      this.fournisseur.name != "" && this.fournisseur.paymentTerm != null && this.fournisseur.paymentTerm != ""
      && this.fournisseur.currencycode != null && this.fournisseur.currencycode != "") {

      this.sharedService.setIsActive(true);
    } else {

      this.sharedService.setIsActive(false);
    }


  }

  codeIsvalid = false

validationCode() {
  const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
  if (codeRegex.test(this.fournisseur.code)) {
    this.codeIsvalid = false;

  }
  else {
  this.codeIsvalid=true
  }

}


  get f() {
    return this.addform.controls;
  }

  // isControlValid(controlCode: string): boolean {
  //   const control = this.addform.controls[controlCode];
  //   return control.invalid && (control.dirty || control.touched);
  // }

  // isControlInValid(controlName: string): boolean {
  //   const control = this.addform.controls[controlName];
  //   return control.invalid && (control.dirty || control.touched);
  // }



  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.fournisseur.code == undefined) {
      this.DCisvalid = true
    }
    else if (this.fournisseur.code.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {

    if (this.fournisseur.name.toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
}
