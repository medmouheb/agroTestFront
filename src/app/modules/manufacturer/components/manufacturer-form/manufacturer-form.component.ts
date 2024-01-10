import { Component, Input } from "@angular/core";
import { manufacturer } from "../../Models/manufacturer.model";

@Component({
  selector: "app-manufacturer-form",
  templateUrl: "./manufacturer-form.component.html",
  styleUrls: ["./manufacturer-form.component.scss"],
})
export class ManufacturerFormComponent {
  @Input() manufacturer!: manufacturer;
  @Input() currentStep!: number;

  constructor() {}
}
