import { Component, Input } from "@angular/core";
import { ShipMethods } from "../../models/shipsmethods";

@Component({
  selector: "app-shipmethods-form",
  templateUrl: "./shipmethods-form.component.html",
  styleUrls: ["./shipmethods-form.component.scss"],
})
export class ShipmethodsFormComponent {
  @Input() shipmethod!: ShipMethods;
  @Input() shipmethodsStep!: number;

  constructor() {}
}
