import { Component, Input } from "@angular/core";
import { Commande } from "../../models/commande.model";

@Component({
  selector: "app-commande-form",
  templateUrl: "./commande-form.component.html",
  styleUrls: ["./commande-form.component.scss"],
})
export class CommandeFormComponent {
  @Input() commande!: Commande;
  @Input() currentStep!: number;

  constructor() {}
}
