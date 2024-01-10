import { Component, Input } from "@angular/core";
import { CostCenter } from "../../model/cost-center";

@Component({
  selector: "app-cost-center-form",
  templateUrl: "./cost-center-form.component.html",
  styleUrls: ["./cost-center-form.component.scss"],
})
export class CostCenterFormComponent {
  @Input() cost!: CostCenter;
  @Input() currentStep!: number;

  wizardStep!: number;

  constructor() {}
}
