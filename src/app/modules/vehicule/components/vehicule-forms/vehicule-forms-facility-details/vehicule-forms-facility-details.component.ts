import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Vehicule } from "app/modules/vehicule/models/vehicule";

@Component({
  selector: "app-vehicule-forms-facility-details",
  templateUrl: "./vehicule-forms-facility-details.component.html",
  styleUrls: ["./vehicule-forms-facility-details.component.scss"],
})
export class VehiculeFormsFacilityDetailsComponent {
  @Input() camp!: Vehicule;
  addform: FormGroup;

  constructor() {}

  initForm() {
    this.addform = new FormGroup({
      facilityID: new FormControl(""),
      facilityName: new FormControl(""),
      primary: new FormControl(""),
      alternative: new FormControl(""),
    });
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  minIwillaya: boolean = false;
}
