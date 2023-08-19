import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import { VehicleTypeService } from "app/modules/vehicle-type/service/vehicle-type.service";
import { VihicleType } from "app/modules/vehicle-type/models/vehicleType";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: 'app-vehicle-type-form-generale',
  templateUrl: './vehicle-type-form-generale.component.html',
  styleUrls: ['./vehicle-type-form-generale.component.scss']
})
export class VehicleTypeFormGeneraleComponent implements OnInit {

  @Input() camp!: VihicleType;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder, private vehicleTypeService: VehicleTypeService) { }
  codes: Array<String> = [];
  ngOnInit(): void {
    console.log("this.camp ::", this.camp)

    if (this.camp != null) {
      this.sharedService.setIsActive(false);
      this.vehicleTypeService.findAll().subscribe(data => {
        this.codes = data.map(el => { return el.vehicleTypeCode })

      })
    };

    if (this.camp == undefined) { this.camp = { vehicleTypeName: "", vehicleTypeCode: "" } };
    this.initForm();
  }

  initForm() {
    this.addform = this.fb.group({
      vehicleTypeCode: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      productType: [""],
      vehicleTypeName: ["", [
        Validators.required
      ]],
      active: [false],
      unitCost: [null],
      tareWeight: [null],
      weightCapacity: [null]
    });
  }


  minIstrueName: boolean = false

  minIstrueCode: boolean = false
  isBlur() {
   if (this.camp.vehicleTypeCode.toString().length < 3) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }



  }

  isBlur1() {
    if (this.camp.vehicleTypeName.toString().length < 3) { this.minIstrueName = true }
    else {
      this.minIstrueName = false
    }
  }
  codetouched = false
  codetouchedfn() {
    this.codetouched = true
  }



  dispotrueCode: boolean = false


  exist() {
    if (this.codes.indexOf(this.camp.vehicleTypeCode.toString()) != -1) {
      this.dispotrueCode = true


    } else {
      this.dispotrueCode = false

    }


  }


  geValues(event) {
    this.exist()
    this.isBlur()
    // console.log("ar:",this.codetouched)

    if (
      !(this.codes.indexOf(this.camp.vehicleTypeCode.toString()) != -1) && !(this.camp.vehicleTypeName.toString().length < 3) && !(this.camp.vehicleTypeCode.toString().length < 3)
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }


  geValues1(event) {
    this.isBlur1()
    // console.log("ar:",this.codetouched)

    if (
      !(this.codes.indexOf(this.camp.vehicleTypeCode.toString()) != -1) && !(this.camp.vehicleTypeName.toString().length < 3) && !(this.camp.vehicleTypeCode.toString().length < 3)
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

}
