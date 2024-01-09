import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-willaya-form-general',
  templateUrl: './willaya-form-general.component.html',
  styleUrls: ['./willaya-form-general.component.scss']
})
export class WillayaFormGeneralComponent implements OnInit {
  @Input() willaya!: Willaya;
  willayareplica!: Willaya;

  addform: FormGroup;

  constructor(private sharedService: SharedService, private willayaser: WillayaService ,private dialogComponent:DialogComponent) { }
  names: Array<String> = [];
  codes: Array<String> = [];
  static = ""
  id=""
  getstatus(){
    
    if (this.willaya.id) {
      
      this.static = "update"
      if(this.id!=this.willaya.id){
        this.id=this.willaya.id
        this.willayareplica =  JSON.parse( JSON.stringify(  this.willaya))

      }
      return "update"

    } else if (!this.willaya.id) {
      this.static = "create"
      this.dialogComponent.setsubmitstatus(false)
      return "create"

    }
  }

  ngOnInit(): void {

    if (this.willaya == undefined) this.willaya = { name: "", code: "" };
    this.initForm();
    this.getetat()

    this.willayaser.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })


  }
  initForm() {
   
    this.addform = new FormGroup({
      code: new FormControl(null, [
        Validators.required,

      ]),
      name: new FormControl(null, [
        Validators.required

      ]),
    });

    
    
    
  }
  getetat() {
    if ((this.addform.status == "INVALID") || (this.willaya.code == undefined) || (this.willaya.name == undefined)) {
      this.sharedService.setIsActive(false);

    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.willaya.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    if (this.codes.indexOf((this.willaya.code + "")) != -1) {
      if(this.static=="update" ){
        if(this.willaya.code == this.willayareplica.code){
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
    if (this.names.indexOf((this.willaya.name + "")) != -1) {
      if(this.static=="update" ){
        

        if(this.willaya.name == this.willayareplica.name){
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


  geValues(event) {
    
    
    

    
    
    

    
    
    console.log(
      "this.willaya.code.length",
      this.willaya.code.toString().length >= 5
    );
    console.log(
      this.willaya.code != null &&
      this.willaya.code != "" &&
      this.willaya.name != null &&
      this.willaya.name != "" &&
      this.willaya.code.toString().length >= 5 &&
      this.willaya.name.toString().length >= 3
    );
    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      
      this.willaya.code != null &&
      this.willaya.code != "" &&
      this.willaya.name != null &&
      this.willaya.name != "" &&
      this.willaya.code.toString().length >= 1 &&
      this.willaya.name.toString().length >= 1
    ) {
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
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.willaya.code == undefined) {
      this.DCisvalid = true
    }
    else if (this.willaya.code.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.willaya.name == undefined) {
      this.DNisvalid = true
    }
    if (this.willaya.name.toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }



  codeIsvalid = false

validationCode() {
  const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
  
  if (codeRegex.test(this.willaya.code)) {
    this.codeIsvalid = false;
  

  }
  else {
  this.codeIsvalid=true
  }

}


  minIstrueName2: boolean = false
















}
