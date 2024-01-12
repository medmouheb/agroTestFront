import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { RapprochementDesStocks } from "app/modules/rapprochementdes-stock/model/rapprochementdes-stock";
import { RapprochementdesStockService } from "app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service";

@Component({
  selector: "app-rapprochementdes-stocks-forms-plus",
  templateUrl: "./rapprochementdes-stocks-forms-plus.component.html",
  styleUrls: ["./rapprochementdes-stocks-forms-plus.component.scss"],
})
export class RapprochementdesStocksFormsPlusComponent implements OnInit {
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
      noDeReferenceAchat: new FormControl(""),
      quantiteRestante: new FormControl(),
      valeurUnitaireRestante: new FormControl(),
      numeroDeReferenceDuFournisseur: new FormControl(),
      quantiteDeDebutDeFiletage: new FormControl(),
      valeurUniteDeDebutDeThread: new FormControl(),
      valeurDeDebutDeThread: new FormControl(),
      dateDeCreationDuFil: new FormControl(),
      dateDuFil: new FormControl(),
      quantiteDeFil: new FormControl(),
      typeEnregistrementDeThread: new FormControl(""),
      ndeReferenceDuFiletage: new FormControl(),
      quantiteRestanteDeFil: new FormControl(),
      valeurUnitaireRestanteDuFil: new FormControl(),
      valeurRestanteDuFil: new FormControl(),
      codeSourceDuFil: new FormControl(""),
      codeDeTransmissionDeFil: new FormControl(""),
      valeurUniteDeFiletage: new FormControl(),
      valeurDeFil: new FormControl(),
      quantiteDeTransport: new FormControl(),
      valeurUnitaireTrans: new FormControl(),
      valeurTrans: new FormControl(),
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
