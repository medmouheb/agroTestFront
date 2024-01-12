import { Component, Input, OnInit } from "@angular/core";
import { Warehouse } from "../../models/warehouse.model";

@Component({
  selector: "app-warehouse-form",
  templateUrl: "./warehouse-form.component.html",
  styleUrls: ["./warehouse-form.component.scss"],
})
export class WarehouseFormComponent implements OnInit {
  @Input()
  warehouse: Warehouse = {};

  @Input()
  currentStep!: number;
  costCenters = [
    {
      code: "code 1",
      name: "Cost center 1",
      type: 0,
    },
    {
      code: "code 2",
      name: "Cost center 2",
      type: 1,
    },
    {
      code: "code 3",
      name: "Cost center 3",
      type: 2,
    },
  ];
  divisions = [
    {
      code: "code 1",
      name: "Division 1",
    },
    {
      code: "code 2",
      name: "Division 2",
    },
    {
      code: "code 3",
      name: "Division 3",
    },
  ];

  constructor() {}

  onStepChange(step: number) {
    this.currentStep = step;
  }

  ngOnInit(): void {}
}
