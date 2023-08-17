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

  @ViewChild("addform")
  addform: FormGroup;
 
  constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: VehiculeService) { }
  codes: Array<String> = [];
  ngOnInit(): void {
    if (this.camp != null) {
      console.log("olll")
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe(data => {
        console.log("777::",data.map(el => { return el.vehiculeCode }))
        this.codes = data.map(el => { return el.vehiculeCode })
      })
    }; 

    if (this.camp == undefined) { this.camp = { vehiculeName: "", vehiculeCode: "" } };
    this.initForm();
    console.log(this.addform);
  }

  initForm(

  ) {
    



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

    }
  }
  exist() {
    console.log(this.camp.vehiculeCode)
    this.compaser.findbycode(this.camp.vehiculeCode).subscribe(data => {
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

  newSeggestions=""

  existname() {
    console.log("aa::",this.codes)
    if (this.codes.indexOf(this.camp.vehiculeCode) != -1) {
      this.dispotruename = true
     // this.newSeggestions= "chose "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()

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
    

    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      this.camp.vehiculeCode != null &&
      this.camp.vehiculeCode != "" &&
      this.camp.vehiculeCode != null &&
      this.camp.vehiculeCode != "" &&
      this.camp.vehiculeCode.toString().length >= 1 &&
      this.camp.vehiculeCode.toString().length >= 1
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
    if ((this.camp.facilitytype.toString().length <12 )|| (this.camp.facilitytype.toString().length > 13)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }
  minMeasurementType: boolean = false

  isBlur4() {
    if ((this.camp.measurementType.toString().length <12 )|| (this.camp.measurementType.toString().length > 13)) {
      this.minMeasurementType = true;
    } else {
      this.minMeasurementType = false;
    }
  }
}
