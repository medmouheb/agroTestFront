import { Component, Input } from "@angular/core";
import { FreightTerms } from "../../models/freightterms";

@Component({
  selector: "app-freighterms-forms",
  templateUrl: "./freighterms-forms.component.html",
  styleUrls: ["./freighterms-forms.component.scss"],
})
export class FreightermsFormsComponent {
  @Input() freightterm!: FreightTerms;
  @Input() shipmethodsStep!: number;
  constructor() {}
}
