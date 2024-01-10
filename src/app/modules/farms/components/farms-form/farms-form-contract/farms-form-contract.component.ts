import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-contract",
  templateUrl: "./farms-form-contract.component.html",
  styleUrls: ["./farms-form-contract.component.scss"],
})
export class FarmsFormContractComponent {
  @Input() farm!: Farm;
  constructor() {}
}
