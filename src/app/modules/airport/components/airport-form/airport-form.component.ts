import { Component, Input } from "@angular/core";
import { airport } from "../../models/airport.model";

@Component({
  selector: "app-airport-form",
  templateUrl: "./airport-form.component.html",
  styleUrls: ["./airport-form.component.scss"],
})
export class AirportFormComponent {
  @Input() airport!: airport;
  @Input() currentStep!: number;

  constructor() {}
}
