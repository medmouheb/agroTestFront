import { Component, Input, OnInit } from "@angular/core";
import { Vehicule } from "../../models/vehicule";

@Component({
  selector: "app-vehicule-forms",
  templateUrl: "./vehicule-forms.component.html",
  styleUrls: ["./vehicule-forms.component.scss"],
})
export class VehiculeFormsComponent implements OnInit {
  @Input() camp!: Vehicule;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
