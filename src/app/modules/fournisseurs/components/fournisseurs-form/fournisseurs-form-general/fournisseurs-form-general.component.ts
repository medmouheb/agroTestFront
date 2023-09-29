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
  fieldControl: FormControl;
  addform: FormGroup;
  cuurencys: Array<Currency> = []
  constructor(private sharedService: SharedService,
    private currencyservice: CurrencyService, private founriserv: FournisseursService) { }

  ngOnInit(): void {
    console.log(this.fournisseur)
    this.initForm();
    if (this.fournisseur.code != null) {
      console.log("all")
      this.sharedService.setIsActive(true);

    }
  
    this.initForm();
    this.getAllCurrency()

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
    console.log(this.fournisseur.code)
    console.log(this.dispotrueCode)

    this.founriserv.findbycode(this.fournisseur.code).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotrueCode = true


      } else {
        this.dispotrueCode = false

      }

    }, error => {
      console.log(error.status)
      if (error.status == 404) {
        this.dispotrueCode = false

      }
    })

  }



  newSeggestions = ""
  existname() {
    this.founriserv.findbyName(this.fournisseur.name).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotruename = true
      //  this.newSeggestions = "chose " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode()


      } else {
        this.dispotruename = false

      }

    }, error => console.log(error))

  }


  selectValue(e: any) {

    let wil = this.cuurencys.filter(el => {
      console.log(el)
      return el.code == e.target.value

    })[0].name
    //this.addform.value['currencyname']=wil
    this.fournisseur.currencyname = wil
    console.log(this.fournisseur.currencycode)
    console.log(this.fournisseur.currencyname)


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
    console.log("====================================");
    console.log(" add form :", this.addform.value);
    console.log("====================================");
  }

  geValues(event) {
    console.log(event);
    console.log(" add form :", this.addform.value);
    console.log("====================================");
    if (this.fournisseur.code != null && this.fournisseur.code != "" && this.fournisseur.name != null && this.dispotrueCode == false && this.dispotruename == false &&
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
  console.log(this.fournisseur.code)
  if (codeRegex.test(this.fournisseur.code)) {
    this.codeIsvalid = false;
  console.log(this.fournisseur.code)

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
