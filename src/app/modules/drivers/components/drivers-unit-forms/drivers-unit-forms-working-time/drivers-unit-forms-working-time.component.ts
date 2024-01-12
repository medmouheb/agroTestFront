import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Drivers } from "app/modules/drivers/models/drivers";
import { DriversService } from "app/modules/drivers/services/drivers.service";

@Component({
  selector: "app-drivers-unit-forms-working-time",
  templateUrl: "./drivers-unit-forms-working-time.component.html",
  styleUrls: ["./drivers-unit-forms-working-time.component.scss"],
})
export class DriversUnitFormsWorkingTimeComponent implements OnInit {
  @Input() camp!: Drivers;
  addform: FormGroup;

  // Array to hold the list of companies

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      listeDesJours: new FormControl(this.camp.listeDesJours),
      heureDebut: new FormControl(this.camp.heureDebut),
      heureFin: new FormControl(this.camp.heureFin),
    });
  }

  //getAll Campany name from service findbycompany

  get f() {
    return this.addform.controls;
  }
  //methode pour get tous les nom from company

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
