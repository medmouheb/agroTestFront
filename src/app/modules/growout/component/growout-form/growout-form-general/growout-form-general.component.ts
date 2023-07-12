import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Division } from "app/modules/division/models/division";
import { DivisionService } from "app/modules/division/services/division.service";
import { Growout } from "app/modules/growout/models/growout";

@Component({
  selector: "app-growout-form-general",
  templateUrl: "./growout-form-general.component.html",
  styleUrls: ["./growout-form-general.component.scss"],
})
export class GrowoutFormGeneralComponent implements OnInit {
  @Input() growout!: Growout;
  @ViewChild("myForm") myForm: NgForm;
  divisions: Array<Division> = [];
  fieldControl: FormControl;
  
  
  formData = {
    name: "",
    email: "",
    message: "",
  };

  currentStep = 1;

  addform: FormGroup;

  constructor(private sharedService: SharedService, private divisionService: DivisionService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getAlldivision()
  }
  getAlldivision() {
    this.divisionService.findAll().subscribe({
      next: (result) => { this.divisions = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }


  selectVAlue(e:any){
    console.log("3==",e.target.value)
    let t=this.divisions.filter(el=>{return el.code==e.target.value})[0].name
    this.addform.value.divisionName=t
    this.growout.divisionName=t
    this.addform.value['divisionName']=t
    console.log("3==",this.addform.value)
    console.log("5==",this.growout)

    console.log("4==",t)

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
      divisionCode: new FormControl("", [
        Validators.required,
      
      ]),
      divisionName: new FormControl("", [
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

    console.log(this.growout.code);
    console.log(this.growout.name);
    console.log(this.growout.divisionName);
    console.log(this.growout.divisionCode);
    
    console.log(
      this.growout.code != null &&
      this.growout.code != "" &&
      this.growout.name != null &&
      this.growout.name != "" &&
      this.growout.divisionCode != null &&
      this.growout.divisionCode != "" &&
      this.growout.divisionName != null &&
      this.growout.divisionName != "" &&
      this.growout.code.toString().length >= 1 &&
      this.growout.name.toString().length >= 1 &&
      this.growout.divisionCode.toString().length >=1 &&
      this.growout.divisionName.toString().length >= 1
    );
    if (
      this.fieldControl.status !="INVALID"  &&
      this.growout.code != null &&
      this.growout.code != "" &&
      this.growout.name != null &&
      this.growout.name != "" &&
      this.growout.divisionCode != null &&
      this.growout.divisionCode != "" &&
      this.growout.divisionName != null &&
      this.growout.divisionName != "" &&
      this.growout.code.toString().length >= 1 &&
      this.growout.name.toString().length >= 1 &&
      this.growout.divisionCode.toString().length >= 1 &&
      this.growout.divisionName.toString().length >= 1 
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  get f() {
    return this.addform.controls;
  }
  divisinv:boolean=false
  isBlur4(){
    if((this.addform.value.divisionCode=="")||(this.growout.divisionCode==undefined)){
      this.divisinv=true
    }else {
      this.divisinv=false
  
    }
  }
  isBlur3() {
    if ((this.fieldControl.value == '')||(this.fieldControl.value == undefined)) {
      this.minIstrueName2 = false

    }
  }
  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  minIstrueName2: boolean = false
  isBlur2() {
    if (this.fieldControl.status=="INVALID"){
      this.minIstrueName2 = true

    }
    else if(this.fieldControl.status=="VALID") {
      this.minIstrueName2 = false

    }
  }

  isBlurDCisvalid() {
    if ( this.growout.code==undefined){
    
      this.DCisvalid = true

    }else if (this.growout.code.toString().length < 1) {
       this.DCisvalid = true
        
    }else {
        this.DCisvalid = false
      }
    
    console.log(this.growout.code)
    
   
  }

  isBlurDNisvalid() {
    if ((this.growout.name==undefined)||(this.growout.name.toString().length < 1)){
      this.DNisvalid = true 
    }
    
    else {
      this.DNisvalid = false
    }
  }

  isBlurSTisvali() {
    if (this.growout.divisionCode.toString().length < 3) { this.STisvali = true }
    else {
      this.STisvali = false
    }
  }

  isBlurMisvalid() {
    if (this.growout.nameCity.toString().length < 3) { this.Misvalid = true }
    else {
      this.Misvalid = false
    }
  }

}
