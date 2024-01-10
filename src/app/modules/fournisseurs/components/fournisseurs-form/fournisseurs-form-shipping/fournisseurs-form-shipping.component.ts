import { Component, Input } from "@angular/core";
import { Fournisseur } from "../../../models/fournisseur.model";

@Component({
  selector: "app-fournisseurs-form-shipping",
  templateUrl: "./fournisseurs-form-shipping.component.html",
  styleUrls: ["./fournisseurs-form-shipping.component.scss"],
})
export class FournisseursFormShippingComponent {
  @Input() fournisseur!: Fournisseur;

  constructor() {}
}
