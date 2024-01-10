import { Component, Input, OnInit } from "@angular/core";
import { Sales } from "../models/sales";

@Component({
  selector: "app-sales-form",
  templateUrl: "./sales-form.component.html",
  styleUrls: ["./sales-form.component.scss"],
})
export class SalesFormComponent implements OnInit {
  @Input() sales!: Sales;
  @Input() currentStep!: number;
  wizardStep!: number;
  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
