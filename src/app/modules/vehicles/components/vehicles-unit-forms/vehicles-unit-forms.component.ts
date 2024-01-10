import { Component, Input } from "@angular/core";
import { Vehicles } from "../../models/vehicles";

@Component({
  selector: "<app-vehicles-unit-forms>",
  templateUrl: "./vehicles-unit-forms.component.html",
  styleUrls: ["./vehicles-unit-forms.component.scss"],
})
export class VehiclesUnitFormsComponent {
  @Input() camp!: Vehicles;
  @Input() currentStep!: number;

  constructor() {}
}
