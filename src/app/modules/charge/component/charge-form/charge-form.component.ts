import { Component, Input, OnInit } from "@angular/core";
import { Charge } from "../../models/charge.model";
@Component({
  selector: "app-charge-form",
  templateUrl: "./charge-form.component.html",
  styleUrls: ["./charge-form.component.scss"],
})
export class ChargeFormComponent implements OnInit {
  @Input() charge!: Charge;
  @Input() currentStep!: number;

  constructor() {}

  ngOnInit(): void {}
}
