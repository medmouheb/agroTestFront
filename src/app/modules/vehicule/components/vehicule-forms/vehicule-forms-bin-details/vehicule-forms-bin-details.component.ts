import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Vehicule } from "app/modules/vehicule/models/vehicule";

@Component({
  selector: "app-vehicule-forms-bin-details",
  templateUrl: "./vehicule-forms-bin-details.component.html",
  styleUrls: ["./vehicule-forms-bin-details.component.scss"],
})
export class VehiculeFormsBinDetailsComponent {
  @Input() camp!: Vehicule;
  addform: FormGroup;

  constructor() {}

  initForm() {
    this.addform = new FormGroup({
      bin: new FormControl(0),
      capacity2: new FormControl(0),
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
