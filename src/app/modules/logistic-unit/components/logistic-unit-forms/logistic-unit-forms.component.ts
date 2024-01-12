import { Component, Input, OnInit } from "@angular/core";
import { LogisticUnit } from "../../models/logistic-unit";

@Component({
  selector: "app-logistic-unit-forms",
  templateUrl: "./logistic-unit-forms.component.html",
  styleUrls: ["./logistic-unit-forms.component.scss"],
})
export class LogisticUnitFormsComponent implements OnInit {
  @Input() camp!: LogisticUnit;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
