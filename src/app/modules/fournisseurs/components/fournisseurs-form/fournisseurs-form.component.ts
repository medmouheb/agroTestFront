import { Component, Input } from "@angular/core";
import { Fournisseur } from "../../models/fournisseur.model";

@Component({
  selector: "app-fournisseurs-form",
  templateUrl: "./fournisseurs-form.component.html",
  styleUrls: ["./fournisseurs-form.component.scss"],
})
export class FournisseursFormComponent {
  @Input() fournisseur!: Fournisseur;
  @Input() currentStep!: number;

  constructor() {}
}
