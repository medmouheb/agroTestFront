import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-visitors",
  templateUrl: "./farms-form-visitors.component.html",
  styleUrls: ["./farms-form-visitors.component.scss"],
})
export class FarmsFormVisitorsComponent {
  @Input() farm!: Farm;
  constructor() {}
}
