import { Component, Input, OnInit } from "@angular/core";
import { RapprochementDesStocks } from "../../model/rapprochementdes-stock";

@Component({
  selector: "app-rapprochementdes-stocks-forms",
  templateUrl: "./rapprochementdes-stocks-forms.component.html",
  styleUrls: ["./rapprochementdes-stocks-forms.component.scss"],
})
export class RapprochementdesStocksFormsComponent implements OnInit {
  @Input() camp!: RapprochementDesStocks;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
