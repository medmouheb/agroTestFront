import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-distance",
  templateUrl: "./farms-form-distance.component.html",
  styleUrls: ["./farms-form-distance.component.scss"],
})
export class FarmsFormDistanceComponent {
  @Input() farm!: Farm;

  constructor() {}
}
