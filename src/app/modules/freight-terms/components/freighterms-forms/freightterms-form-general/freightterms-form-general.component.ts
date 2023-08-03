import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { FreightTermsService } from 'app/modules/freight-terms/Service/freight-terms.service';
import { FreightTerms } from 'app/modules/freight-terms/models/freightterms';

@Component({
  selector: 'app-freightterms-form-general',
  templateUrl: './freightterms-form-general.component.html',
  styleUrls: ['./freightterms-form-general.component.scss']
})
export class FreighttermsFormGeneralComponent implements OnInit {
  @Input() freightterm!:FreightTerms
  addform: FormGroup;
  constructor(private sharedService: SharedService,private freighttermsservice:FreightTermsService) { }

  ngOnInit(): void {
    if (this.freightterm == undefined) this.freightterm = { freighttermcode: "", freighttermname : "" };
    this.initForm();
    this.getetat()
  }
  initForm() {
   
    this.addform = new FormGroup({
      freighttermcode: new FormControl(null, [
        Validators.required, 

      ]),
      freighttermname : new FormControl(null, [
        Validators.required 

      ]),
      notes: new FormControl(null),
      active: new FormControl(null),
    });

    console.log("====================================");
    console.log(" add form :", this.addform.value);
    console.log("====================================");
  }
  getetat() {
    if ((this.addform.status == "INVALID") || (this.freightterm.freighttermcode == undefined) || (this.freightterm.freighttermname  == undefined)) {
      this.sharedService.setIsActive(false);

    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.freightterm.freighttermcode == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    console.log(this.freightterm.freighttermcode)
    this.freighttermsservice.findbycode(this.freightterm.freighttermcode).subscribe(data => {
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
    console.log("e::")
    this.freighttermsservice.findbyName(this.freightterm.freighttermname ).subscribe(data => {
      console.log("e::", data)
      if (data != null) {
        this.dispotruename = true
        //this.newSeggestions = "chose " + this.freightterms.name + this.generateRandomCode() + " or " + this.freightterms.name + this.generateRandomCode() + " or " + this.freightterms.name + this.generateRandomCode() + " or " + this.freightterms.name + this.generateRandomCode()


      } else {
        this.dispotruename = false

      }

    }, error => console.log(error))

  }
  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform.value);
    console.log("====================================");

    console.log(this.freightterm.freighttermcode);
    console.log(this.freightterm.freighttermname );
    console.log(
      "this.freightterms.code.length",
      this.freightterm.freighttermcode.toString().length >= 5
    );
    console.log(
      this.freightterm.freighttermcode != null &&
      this.freightterm.freighttermcode != "" &&
      this.freightterm.freighttermname  != null &&
      this.freightterm.freighttermname  != "" &&
      this.freightterm.freighttermcode.toString().length >= 1 &&
      this.freightterm.freighttermname .toString().length >=1
    );
    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      
      this.freightterm.freighttermcode != null &&
      this.freightterm.freighttermcode != "" &&
      this.freightterm.freighttermname  != null &&
      this.freightterm.freighttermname  != "" &&
      this.freightterm.freighttermcode.toString().length >= 1 &&
      this.freightterm.freighttermname .toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    
    }
    console.log("le ship :", this.freightterm);

  }

  get f() {
    return this.addform.controls;
  }
  setList(){
    console.log(this.freightterm.freighttermcode)
    let ch=this.freightterm.freighttermcode
    switch(ch){
      case "CIF":
        this.freightterm.freighttermname ="Cost,Insurance,Freight";
        break; 
        case "CFR":
        this.freightterm.freighttermname ="Cost and Freight";
        break; 
        case "FOB":
        this.freightterm.freighttermname ="Free On Board";
        break; 
        case "FoB":
        this.freightterm.freighttermname ="Freight On Board";
        break; 
        case "DAT":
        this.freightterm.freighttermname ="Delivered at Terminal";
        break; 
        case "CIP":
        this.freightterm.freighttermname ="Carrier Insurance Paid";
        break; 
      
    }
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
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.freightterm.freighttermcode == undefined) {
      this.DCisvalid = true
    }
    else if (this.freightterm.freighttermcode.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.freightterm.freighttermname  == undefined) {
      this.DNisvalid = true
    }
    if (this.freightterm.freighttermname .toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
  minIstrueName2: boolean = false


}
