import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Vehicles } from 'app/modules/vehicles/models/vehicles';
import { VehiclesService } from 'app/modules/vehicles/services/vehicles.service';

@Component({
  selector: 'app-vehicles-unit-forms-general',
  templateUrl: './vehicles-unit-forms-general.component.html',
  styleUrls: ['./vehicles-unit-forms-general.component.scss']
})
export class VehiclesUnitFormsGeneralComponent implements OnInit {

  @Input() camp!: Vehicles;
  campReplica!: Vehicles;


  @ViewChild("addform")
  addform: FormGroup;
 
  constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: VehiclesService) { }
  codes: Array<String> = [];
  names: Array<String> = [];
  ngOnInit(): void {
    if (this.camp != null) {
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe(data => {
        this.codes = data.map(el => { return el.codeVehicule })
        this.names = data.map(el => { return el.nomDuVehicule })
      })
    }; 

    if (this.camp == undefined) { this.camp = { nomDuVehicule: "", codeVehicule: "" } };
    this.initForm();
    console.log(this.addform);
    if (this.camp.id) {
      this.static = "update"
      this.campReplica =  JSON.parse( JSON.stringify(  this.camp))
    } else if (!this.camp.id) {
      this.static = "create"
      this.sharedService.setIsActive(false)
    }
  }
  static=""
  initForm(

  ) {
    



    this.addform = this.fb.group({
      codeVehicule: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      nomDuVehicule: [
        null,
        Validators.required,
      ],
    });

  }

  minIstrueCode: boolean = false

  isBlur() {

    if (this.camp.codeVehicule == undefined) {
      this.minIstrueCode = true
    }
    else if (this.camp.codeVehicule.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.camp.codeVehicule == null) {
      this.dispotrueCode = false

    }
  }


  
  codeIsvalid = false

validationCode() {
  const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
  console.log(this.camp.codeVehicule)
  if (codeRegex.test(this.camp.codeVehicule)) {
    this.codeIsvalid = false;
  console.log(this.camp.codeVehicule)

  }
  else {
  this.codeIsvalid=true
  }

}
  exist() {
    if (this.codes.indexOf(this.camp.codeVehicule) != -1) {
      if(this.static=="update" ){
        if(this.camp.codeVehicule == this.campReplica.codeVehicule){
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

  exist1() {
    console.log(this.camp.nomDuVehicule);
    this.compaser.findbyName(this.camp.nomDuVehicule).subscribe(
      (data) => {
        console.log(data);
        if (data != null) {
          this.dispotruename = true;
        } else {
          this.dispotruename = false;
        }
      },
      (error) => {
        console.log(error.status);
        if (error.status == 404) {
          this.dispotruename = false;
        }
      }
    );
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

  newSeggestions=""

  existname() {
    if (this.names.indexOf(this.camp.nomDuVehicule) != -1) {
      if(this.static=="update" ){
        if(this.camp.nomDuVehicule == this.campReplica.nomDuVehicule){
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

  minIstrueName: boolean = false
  minIstrueName2: boolean = false
  // isBlur2() {
  //   console.log(this.minIstrueName2)
  //   console.log('===3:', this.fieldControl.value
  //   )

  //   if (this.fieldControl.status == "INVALID") {
  //     this.minIstrueName2 = true

  //   }
  //   else if (this.fieldControl.status == "VALID") {
  //     this.minIstrueName2 = false

  //   }
  // }
  // isBlur3() {
  //   if ((this.fieldControl.value == '') || (this.fieldControl.value == undefined)) {
  //     this.minIstrueName2 = false

  //   }
  // }
  isBlur1() {
    console.log(this.camp.nomDuVehicule);
    if (
      this.camp.nomDuVehicule === undefined ||
      this.camp.nomDuVehicule.trim() === ""
    ) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }
  
  geValues(event) {
    

    if (
      !this.codeIsvalid &&  this.dispotrueCode == false && this.dispotruename == false &&
      this.camp.codeVehicule != null &&
      this.camp.codeVehicule != "" &&
      this.camp.nomDuVehicule != null &&
      this.camp.nomDuVehicule != "" &&
      this.camp.codeVehicule.toString().length >= 1 &&
      this.camp.nomDuVehicule.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  get f() {
    return this.addform.controls;
  }
  minIphone: boolean = false


}
