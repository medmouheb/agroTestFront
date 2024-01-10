import { Component, Input } from "@angular/core";
import { Produit } from "../../models/produit.model";

@Component({
  selector: "app-produits-form",
  templateUrl: "./produits-form.component.html",
  styleUrls: ["./produits-form.component.scss"],
})
export class ProduitsFormComponent {
  @Input() produit!: Produit;
  @Input() currentStep!: number;

  constructor() {}
}
