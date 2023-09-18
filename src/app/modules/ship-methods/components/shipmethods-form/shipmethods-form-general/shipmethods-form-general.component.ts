import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { ShipmethodsService } from 'app/modules/ship-methods/Services/shipmethods.service';
import { ShipMethods } from 'app/modules/ship-methods/models/shipsmethods';

@Component({
  selector: 'app-shipmethods-form-general',
  templateUrl: './shipmethods-form-general.component.html',
  styleUrls: ['./shipmethods-form-general.component.scss']
})
export class ShipmethodsFormGeneralComponent implements OnInit {
  @Input() shipmethod!: ShipMethods
  addform: FormGroup;
  constructor(private sharedService: SharedService,private shipmethodservice:ShipmethodsService) {}

  ngOnInit(): void {
    if (this.shipmethod == undefined) this.shipmethod = { name: "", code: "" };
    this.initForm();
    this.getetat()

    if(this.codeList.indexOf(this.shipmethod.code )!=-1){
      this.otherCondition=true
    }

  }
  initForm() {
   
    this.addform = new FormGroup({
      code: new FormControl(null, [
        Validators.required, 

      ]),
      name: new FormControl(null, [
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
    if ((this.addform.status == "INVALID") || (this.shipmethod.code == undefined) || (this.shipmethod.name == undefined)) {
      this.sharedService.setIsActive(false);

    }
  }

  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.shipmethod.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    console.log(this.shipmethod.code)
    this.shipmethodservice.findbycode(this.shipmethod.code).subscribe(data => {
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
    this.shipmethodservice.findbyName(this.shipmethod.name).subscribe(data => {
      console.log("e::", data)
      if (data != null) {
        this.dispotruename = true
        //this.newSeggestions = "chose " + this.shipmethods.name + this.generateRandomCode() + " or " + this.shipmethods.name + this.generateRandomCode() + " or " + this.shipmethods.name + this.generateRandomCode() + " or " + this.shipmethods.name + this.generateRandomCode()


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

    console.log(this.shipmethod.code);
    console.log(this.shipmethod.name);
    console.log(
      "this.shipmethods.code.length",
      this.shipmethod.code.toString().length >= 5
    );
    console.log(
      this.shipmethod.code != null &&
      this.shipmethod.code != "" &&
      this.shipmethod.name != null &&
      this.shipmethod.name != "" &&
      this.shipmethod.code.toString().length >= 1 &&
      this.shipmethod.name.toString().length >=1
    );
    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      
      this.shipmethod.code != null &&
      this.shipmethod.code != "" &&
      this.shipmethod.name != null &&
      this.shipmethod.name != "" &&
      this.shipmethod.code.toString().length >= 1 &&
      this.shipmethod.name.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    
    }

    if(this.codeList.indexOf(this.shipmethod.code )!=-1){
      console.log("      this.otherCondition=true      ",this.shipmethod.code,(this.codeList.indexOf(this.shipmethod.code )!=-1))
    }else{
      console.log("      this.otherCondition=false      ",this.shipmethod.code,(this.codeList.indexOf(this.shipmethod.code )!=-1))
      this.otherCondition=true

    }
    console.log("le ship :", this.shipmethod);

  }

  get f() {
    return this.addform.controls;
  }

  codeList=["AIR","DEL","Ground","SEA","RAIL","P/U"]

  otherCondition=false

  setList(){
    console.log(this.shipmethod.code)
    let ch=this.shipmethod.code
    switch(ch){
      case "AIR":
        this.shipmethod.name="Air";
        this.otherCondition=false

        break; 
        case "DEL":
        this.shipmethod.name="Delivery";
        this.otherCondition=false

        break; 
        case "Ground":
        this.shipmethod.name="Ground";
        this.otherCondition=false

        break; 
        case "SEA":
        this.shipmethod.name="Sea";
        this.otherCondition=false

        break; 
        case "RAIL":
        this.shipmethod.name="Rail/Train";
        this.otherCondition=false

        break; 
        case "P/U":
        this.shipmethod.name="Pick-up";
        this.otherCondition=false

        break; 

        default : this.otherCondition=true
        this.shipmethod.name=""
        this.shipmethod.code=""
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
    if (this.shipmethod.code == undefined) {
      this.DCisvalid = true
    }
    else if (this.shipmethod.code.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.shipmethod.name == undefined) {
      this.DNisvalid = true
    }
    if (this.shipmethod.name.toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
  minIstrueName2: boolean = false

}
