import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-ressource",
  templateUrl: "./farms-form-ressource.component.html",
  styleUrls: ["./farms-form-ressource.component.scss"],
})
export class FarmsFormRessourceComponent {
  @Input() farm!: Farm;
  constructor() {}
}
