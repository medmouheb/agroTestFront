import { Component, Input } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-paiement",
  templateUrl: "./farms-form-paiement.component.html",
  styleUrls: ["./farms-form-paiement.component.scss"],
})
export class FarmsFormPaiementComponent {
  @Input() farm!: Farm;
  constructor() {}
}
