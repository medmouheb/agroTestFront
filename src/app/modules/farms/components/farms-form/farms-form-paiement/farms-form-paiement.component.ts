import { Component, Input, OnInit } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-paiement",
  templateUrl: "./farms-form-paiement.component.html",
  styleUrls: ["./farms-form-paiement.component.scss"],
})
export class FarmsFormPaiementComponent implements OnInit {
  @Input() farm!: Farm;
  constructor() {}

  ngOnInit(): void {}
}
