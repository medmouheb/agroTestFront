import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-feedmils",
  templateUrl: "./farms-form-feedmils.component.html",
  styleUrls: ["./farms-form-feedmils.component.scss"],
})
export class FarmsFormFeedmilsComponent {
  @Input() farm!: Farm;

  constructor() {}
}
