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
    console.log("2a",this.sales)
if(this.sales.id!=null){
  this.sharedService.setIsActive(true);
}
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
   
  }
  geValues(event) {

    if (
      this.addform.value.code != null &&
      this.addform.value.code != "" &&
      this.addform.value.name != null && this.existcodeIsvalid == false && this.dispotruename == false &&
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
    this.salesService.findbyName(this.sales.name).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotruename = true
      //  this.newSeggestions = "chose " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode() + " or " + this.fournisseur.name + this.generateRandomCode()


      } else {
        this.dispotruename = false

      }

    }, error => console.log(error))

  }

  existcodeIsvalid = false
  existcode() {

   this.salesService.findbycode(this.sales.code).subscribe(data => {
    console.log(data)
    if (data != null) {
      this.existcodeIsvalid = true


    } else {
      this.existcodeIsvalid = false

    }

  }, error => {
    console.log(error.status)
    if (error.status == 404) {
      this.existcodeIsvalid = false

    }
  })
  }


  codeIsvalid = false

  validationCode() {
    const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
    console.log(this.sales.code)
    if (codeRegex.test(this.sales.code)) {
      this.codeIsvalid = false;
    console.log(this.sales.code)
  
    }
    else {
    this.codeIsvalid=true
    }
  
  }

}
