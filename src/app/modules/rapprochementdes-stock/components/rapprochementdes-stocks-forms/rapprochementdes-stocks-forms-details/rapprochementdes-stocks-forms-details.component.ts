import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { RapprochementDesStocks } from "app/modules/rapprochementdes-stock/model/rapprochementdes-stock";
import { RapprochementdesStockService } from "app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service";

@Component({
  selector: "app-rapprochementdes-stocks-forms-details",
  templateUrl: "./rapprochementdes-stocks-forms-details.component.html",
  styleUrls: ["./rapprochementdes-stocks-forms-details.component.scss"],
})
export class RapprochementdesStocksFormsDetailsComponent implements OnInit {
  @Input() camp!: RapprochementDesStocks;
  addform: FormGroup;

  divisionNames: string[] = [];
  selectedDivisionName: string = "";

  // Array to hold the list of companies

  constructor(
    private sharedService: SharedService,
    private rapprochementDesStockService: RapprochementdesStockService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      typeEnregistrement: new FormControl(this.camp.typeEnregistrement),
      transCode: new FormControl(""),
      dateInventaire: new FormControl(),
      identiteDeTransaction: new FormControl(""),
      nomEntiteDeTransaction: new FormControl(""),
      numeroDeProduit: new FormControl(""),
      nomDuProduit: new FormControl(""),
      typeDeProduit: new FormControl(""),
      numeroEmplacement: new FormControl(""),
      quantite: new FormControl(),
      leValeur: new FormControl(""),
      statusDeLaPublication: new FormControl(""),
      codeSource: new FormControl(""),
    });
  }

  //getAll Campany name from service findbycompany

  get f() {
    return this.addform.controls;
  }
  //methode pour get tous les nom from company

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  minIwillaya: boolean = false;
}
