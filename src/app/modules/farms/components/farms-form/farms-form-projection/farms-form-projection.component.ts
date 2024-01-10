import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-projection",
  templateUrl: "./farms-form-projection.component.html",
  styleUrls: ["./farms-form-projection.component.scss"],
})
export class FarmsFormProjectionComponent {
  @Input() farm!: Farm;
  constructor() {}
}
