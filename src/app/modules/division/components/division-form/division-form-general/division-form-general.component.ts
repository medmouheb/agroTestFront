import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Currency } from "app/modules/currency/models/currency";
import { CurrencyService } from "app/modules/currency/services/currency.service";
import { DivisionService } from "app/modules/division/services/division.service";
import { Division } from "../../../models/division";

@Component({
  selector: "app-division-form-general",
  templateUrl: "./division-form-general.component.html",
  styleUrls: ["./division-form-general.component.scss"],
})
export class DivisionFormGeneralComponent implements OnInit {
  @Input() division!: Division;
  addform: FormGroup;
  fieldControl: FormControl;
  cuurencys: Array<Currency> = []
  constructor(private sharedService: SharedService, private currencyservice: CurrencyService, private divisionserv: DivisionService) { }

  ngOnInit(): void {
    console.log(this.division)
    if (this.division != null) {
      console.log("olll")
      this.sharedService.setIsActive(true);
    };
    this.affiche()
    this.initForm();
    this.getAllCurrency()
  }
  affiche() {
    if (this.division.code != null &&
      this.division.code != "") {
      this.sharedService.setIsActive(true);

    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false

  blur1() {
    if (this.division.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    console.log(this.division.code)
    this.divisionserv.findbycode(this.division.code).subscribe(data => {
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

  existname() {
    this.divisionserv.findbyName(this.division.name).subscribe(data => {
      if (data != null) {
        this.dispotruename = true
        this.newSeggestions= "chose "+this.division.name+this.generateRandomCode()+" or "+this.division.name+this.generateRandomCode()+" or "+this.division.name+this.generateRandomCode()+" or "+this.division.name+this.generateRandomCode()
      } else {
        this.dispotruename = false
      }

    }, error => console.log(error))

  }

  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,

      Validators.pattern(/^[a-zA-Z ]*$/),
    ]);
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,

      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),
      ]),
      speciesType: new FormControl("", [
        Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      measurement: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      currencycode: new FormControl("", [
        Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      currencyname: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
      divisiontype: new FormControl("", [
        // Validators.required,
        // Validators.minLength(3),
        // Validators.maxLength(8),
      ]),
    });
    // console.log("====================================");
    // console.log(" add form :", this.addform);
    // console.log("====================================");
  }
  getAllCurrency() {
    this.currencyservice.findAll().subscribe({
      next: (result) => (this.cuurencys = result),
      error: (error) => console.error(error),
    });
  }

  selectValue(e: any) {

    let wil = this.cuurencys.filter(el => {
      console.log(el)
      return el.code == e.target.value

    })[0].name
    //this.addform.value['currencyname']=wil
    this.division.currencyname = wil
    console.log(this.division.currencycode)
    console.log(this.division.currencyname)


  }

  listA:String[]=[]
  setList(){
    console.log("ll::",this.division.divisiontype)
    switch(this.division.divisiontype){
      case "Agriculture":this.listA=["Agriculture maraîchère","Arboriculture","Agriculture biologique","Permaculture"] ;break ; 
      case "Aviculture":this.listA=["Chicken","Layer","Turkey","Duck"] ;break ; 
      case "Bovin":this.listA=["fattening cow farms","Dairy farms"] ;break ; 
    }
  }

  geValues(event) {
    console.log(this.addform.value.speciesType);
    console.log(this.division.speciesType);
    console.log("event :", event);
    // console.log("====================================");

    // console.log("====================================");
    console.log("le formulaire :", this.addform.value);
    // console.log("====================================");

    console.log(this.division)
    // console.log(this.division.name);
    // console.log(
    //   "this.division.code.length",
    //   this.division.code.toString().length >= 5
    // );
    // console.log(
    //   this.division.code != null &&
    //     this.division.code != "" &&
    //     this.division.name != null &&
    //     this.division.name != "" &&
    //     this.division.code.toString().length >= 5 &&
    //     this.division.name.toString().length >= 3
    // );
    console.log(this.division.code)
    console.log(this.division.name)
    console.log(this.division.speciesType)
    console.log(this.division.currencycode)
    console.log(this.division.name)
    console.log(this.division.code != null &&
      this.division.code != "" &&
      this.division.name != null &&
      this.division.name != ""
      && this.division.currencycode != "" && this.division.speciesType != "" && this.division.currencycode != undefined
    )
    if (
      this.dispotrueCode == false && this.dispotruename == false &&

      this.division.code != null &&
      this.division.code != "" &&
      this.division.name != null &&
      this.division.name != ""
      && this.division.currencycode != "" && this.division.speciesType != "" && this.division.currencycode != undefined

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  minIstrueName2: boolean = false
  isBlur2() {
    if (this.fieldControl.status == "INVALID") {
      this.minIstrueName2 = true

    }
    else if (this.fieldControl.status == "VALID") {
      this.minIstrueName2 = false

    }
  }
  isBlur3() {
    if ((this.fieldControl.value == '') || (this.fieldControl.value == undefined)) {
      this.minIstrueName2 = false

    }
  }
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  currecnyinv: boolean = false
  isBlur4() {
    if ((this.addform.value.currencycode == "") || (this.division.currencycode == undefined)) {
      this.currecnyinv = true
    } else {
      this.currecnyinv = false

    }
  }
  isBlurDCisvalid() {
    if (this.division.code == undefined) {
      this.DCisvalid = true;
    }
    else if (this.division.code.toString().length < 1) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {

    if (this.division.name == undefined) {
      console.log("ok")
      this.DNisvalid = true;
    }
    else if (this.division.name.toString().length < 1) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  isBlurSTisvali() {
    console.log(this.addform.value.speciesType)
    console.log(this.division.speciesType)
    if ((this.division.speciesType.toString().length < 1) || (this.division.speciesType.toString().length > 20)
      || (this.addform.value.speciesType == "")) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
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
}
