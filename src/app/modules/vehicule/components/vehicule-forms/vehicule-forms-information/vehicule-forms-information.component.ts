import { Component, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Vehicule } from "app/modules/vehicule/models/vehicule";

@Component({
  selector: "app-vehicule-forms-information",
  templateUrl: "./vehicule-forms-information.component.html",
  styleUrls: ["./vehicule-forms-information.component.scss"],
})
export class VehiculeFormsInformationComponent {
  @Input() camp!: Vehicule;
  addform: FormGroup;

  constructor() {}

  initForm() {
    this.addform = new FormGroup({
      active: new FormControl(false),
      yardBuggy: new FormControl(false),
      external: new FormControl(false),
      bioSecurityLevelCode: new FormControl(""),
      tareVariance: new FormControl(0),
      tareWeight: new FormControl(0),
      tareWtRecord: new FormControl(null),
      tareWtRecordRef: new FormControl(""),
      bins: new FormControl(0),
      trailer: new FormControl(false),
      trailerSequence: new FormControl(0),
      capacity: new FormControl(0),
      color: new FormControl(""),
      notes: new FormControl(""),
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
