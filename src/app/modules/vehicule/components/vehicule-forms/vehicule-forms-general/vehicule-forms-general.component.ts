import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { VehiculeService } from 'app/modules/vehicule/Services/vehicule.service';
import { Vehicule } from 'app/modules/vehicule/models/vehicule';

@Component({
  selector: 'app-vehicule-forms-general',
  templateUrl: './vehicule-forms-general.component.html',
  styleUrls: ['./vehicule-forms-general.component.scss']
})
export class VehiculeFormsGeneralComponent implements OnInit {

  @Input() camp!: Vehicule;
  campReplica!: Vehicule;


  @ViewChild("addform")
  addform: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: VehiculeService) { }
  codes: Array<String> = [];
  names: Array<String> = [];

  ngOnInit(): void {
    if (this.camp != null) {
      console.log("olll")
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe(data => {
        this.codes = data.map(el => { return el.vehiculeCode })
        this.names = data.map(el => {
          return el.vehiculeName
        })
      })
    };

    if (this.camp == undefined) { 
      this.camp = { vehiculeName: "", vehiculeCode: "" } 
    };
    this.initForm();
    console.log(this.addform);
    if (this.camp.id) {
      this.static = "update"
      this.campReplica =  JSON.parse( JSON.stringify(  this.camp))
    } else if (!this.camp.id) {
      this.static = "create"
    }
  }
  static=""
  initForm() {
    this.addform = this.fb.group({
      vehiculeCode: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      vehiculeName: [
        null,
        [Validators.required,],
      ],
      facilitytype: [
        null,
        [Validators.required,],
      ],
      measurementType: [
        null,
        [Validators.required,],
      ],
      vehiculeType: [
        null
      ],

    });

  }

  minIstrueCode: boolean = false

  isBlur() {

    if (this.camp.vehiculeCode == undefined) {
      this.minIstrueCode = true
    }
    else if (this.camp.vehiculeCode.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.camp.vehiculeCode == null) {
      this.dispotrueCode = false
      this.sharedService.setIsActive(false);
    }
  }
  exist() {
    if (this.codes.indexOf((this.camp.vehiculeCode + "")) != -1) {
      if(this.static=="update" ){
        if(this.camp.vehiculeCode == this.campReplica.vehiculeCode){
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
    if (this.names.indexOf(this.camp.vehiculeName) != -1) {
      if(this.static=="update" ){
        if(this.camp.vehiculeName == this.campReplica.vehiculeName){
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
    console.log(this.minIstrueName2)
    if (this.camp.vehiculeCode == undefined) {
      this.minIstrueName = true


    }
    else if (this.camp.vehiculeCode.toString().length < 1) {
      this.minIstrueName = true

    }
    else {
      this.minIstrueName = false

    }
  }
  geValues(event) {

    console.log("erty::", !this.codeIsvalid , !this.dispotrueCode , !this.minIstrueCode , !this.minIstrueName  , !this.dispotruename  , !this.minIphone   , !this.minMeasurementType)
    if (

      this.camp.vehiculeCode != null &&
      this.camp.vehiculeCode != "" &&
      this.camp.vehiculeCode != null &&
      this.camp.vehiculeCode != "" &&
      this.camp.vehiculeCode.toString().length >= 1 &&
      this.camp.vehiculeCode.toString().length <= 50 &&
      this.camp.vehiculeName != null &&
      this.camp.vehiculeName != "" &&
      this.camp.vehiculeName != null &&
      this.camp.vehiculeName != "" &&
      this.camp.vehiculeName.toString().length >= 1 &&
      this.camp.vehiculeName.toString().length <= 50 &&
      this.camp.facilitytype != null &&
      this.camp.facilitytype != "" &&
      this.camp.facilitytype != null &&
      this.camp.facilitytype != "" &&
      this.camp.facilitytype.toString().length >= 1 &&
      this.camp.measurementType != null &&
      this.camp.measurementType != "" &&
      this.camp.measurementType != null &&
      this.camp.measurementType != "" &&
      this.camp.measurementType.toString().length >= 1 &&
      !this.codeIsvalid && !this.dispotrueCode && !this.minIstrueCode && !this.minIstrueName  && !this.dispotruename  && !this.minIphone   && !this.minMeasurementType
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

  isBlur3() {
    if ((this.camp.facilitytype.toString().length < 1)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }


  codeIsvalid = false

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    console.log(this.camp.vehiculeCode)
    if (codeRegex.test(this.camp.vehiculeCode)) {
      this.codeIsvalid = false;
      console.log(this.camp.vehiculeCode)

    }
    else {
      this.codeIsvalid = true
    }

  }


  minMeasurementType: boolean = false

  isBlur4() {
    if (this.camp.measurementType.toString().length < 1) {
      this.minMeasurementType = true;
    } else {
      this.minMeasurementType = false;
    }
  }
}
