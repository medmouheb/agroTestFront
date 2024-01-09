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
  divisionReplica!: Division;
  addform: FormGroup;
  fieldControl: FormControl;
  cuurencys: Array<Currency> = []
  constructor(private sharedService: SharedService, private currencyservice: CurrencyService, private divisionserv: DivisionService) { }
  names: Array<String> = [];
  codes: Array<String> = [];

  static = ""

  ngOnInit(): void {
    this.divisionserv.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })
    
    if (this.division != null) {
      
      this.sharedService.setIsActive(true);
    };
    this.affiche()
    this.initForm();
    this.getAllCurrency()


    switch (this.division.divisiontype) {
      case "Agriculture": this.listA = ["Agriculture maraîchère", "Arboriculture", "Agriculture biologique", "Permaculture"]; break;
      case "Aviculture": this.listA = ["Chicken", "Layer", "Turkey", "Duck"]; break;
      case "Bovin": this.listA = ["fattening cow farms", "Dairy farms"]; break;
    }

    if (this.division.id) {
      this.static = "update"
      this.divisionReplica =  JSON.parse( JSON.stringify(  this.division))
    } else if (!this.division.id) {
      this.static = "create"
    }

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
    if (this.codes.indexOf((this.division.code + "")) != -1) {
      if(this.static=="update" ){
        if(this.division.code == this.divisionReplica.code){
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
    if (this.names.indexOf(this.division.name) != -1) {
      if(this.static=="update" ){
        if(this.division.name == this.divisionReplica.name){
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

    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,

      ]),
      name: new FormControl("", [
        Validators.required
      ]),
      speciesType: new FormControl("", [
        Validators.required,


      ]),
      measurement: new FormControl("", [



      ]),
      currencycode: new FormControl("", [
        Validators.required,


      ]),
      currencyname: new FormControl("", [



      ]),
      divisiontype: new FormControl("", [



      ]),
    });



  }
  getAllCurrency() {
    this.currencyservice.findAll().subscribe({
      next: (result) => (this.cuurencys = result),
      error: (error) => console.error(error),
    });
  }

  selectValue(e: any) {

    let wil = this.cuurencys.filter(el => {
      
      return el.code == e.target.value

    })[0].name

    this.division.currencyname = wil
    
    


  }

  listA: String[] = []
  setList() {
    
    switch (this.division.divisiontype) {
      case "Agriculture": this.listA = ["Agriculture maraîchère", "Arboriculture", "Agriculture biologique", "Permaculture"]; break;
      case "Aviculture": this.listA = ["Chicken", "Layer", "Turkey", "Duck"]; break;
      case "Bovin": this.listA = ["fattening cow farms", "Dairy farms"]; break;
    }
    this.division.speciesType=""
  }

  geValues(event) {


    
    
    
     





















    
    
    
    
    
    console.log(this.division.code != null &&
      this.division.code != "" &&
      this.division.name != null &&
      this.division.name != "" 
      && this.division.currencycode!="" && this.division.speciesType!="" && this.division.speciesType!=undefined&& this.division.currencycode!=undefined
)
    if (

      this.dispotrueCode == false && this.dispotruename == false &&

      this.division.code != null &&
      this.division.code != "" &&
      this.division.measurement != null &&
      this.division.measurement != "" &&
      this.division.name != null &&

      this.division.name != "" && !(!this.division.speciesType)
      && this.division.currencycode!="" &&this.division.speciesType!="" && this.division.currencycode!=undefined
      && this.division.speciesType!=undefined
    ) {

      
      
      
      
      
      
      
      
      
      


      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  minIstrueName2: boolean = false


  DCisvalid: boolean = false;
  MSisvalid: boolean = false;

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

  isBlurMSisvalid() {
    if (this.division.code == undefined) {
      this.MSisvalid = true;
    }
    else if (this.division.code.toString().length < 1) {
      this.MSisvalid = true;
    } else {
      this.MSisvalid = false;
    }
  }

  isBlurDNisvalid() {

    if (this.division.name == undefined) {
      
      this.DNisvalid = true;
    }
    else if (this.division.name.toString().length < 1) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  isBlurSTisvali() {
    
    
    if ((this.division.speciesType.toString().length < 1) || (this.division.speciesType.toString().length > 20)
      || (this.addform.value.speciesType == "")) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
    }
  }

  codeIsvalid = false

validationCode() {
  const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
  
  if (codeRegex.test(this.division.code)) {
    this.codeIsvalid = false;
  

  }
  else {
  this.codeIsvalid=true
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
