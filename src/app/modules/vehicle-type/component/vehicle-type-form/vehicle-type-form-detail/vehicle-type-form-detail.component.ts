import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { VehicleTypeService } from "app/modules/vehicle-type/service/vehicle-type.service";
import { VihicleType } from "app/modules/vehicle-type/models/vehicleType";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-vehicle-type-form-detail",
  templateUrl: "./vehicle-type-form-detail.component.html",
  styleUrls: ["./vehicle-type-form-detail.component.scss"],
})
export class VehicleTypeFormDetailComponent implements OnInit {
  @Input() camp!: VihicleType;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private vehicleTypeService: VehicleTypeService,
  ) {}
  codes: Array<String> = [];
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = this.fb.group({
      productType: [""],

      active: [false],
      unitCost: [null],
      tareWeight: [null],
      weightCapacity: [null],
    });
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
