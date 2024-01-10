import { Component, OnInit, Input } from "@angular/core";
import { Commande } from "app/modules/commande/models/commande.model";

@Component({
  selector: "app-commande-form-information",
  templateUrl: "./commande-form-information.component.html",
  styleUrls: ["./commande-form-information.component.scss"],
})
export class CommandeFormInformationComponent implements OnInit {
  @Input() commande!: Commande;
  constructor() {}

  ngOnInit(): void {}
}
