import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-live-haul",
  templateUrl: "./farms-form-live-haul.component.html",
  styleUrls: ["./farms-form-live-haul.component.scss"],
})
export class FarmsFormLiveHaulComponent {
  @Input() farm!: Farm;
  constructor() {}
}
