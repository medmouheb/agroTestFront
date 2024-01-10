import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { RapprochementDesStocks } from "app/modules/rapprochementdes-stock/model/rapprochementdes-stock";
import { RapprochementdesStockService } from "app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service";

@Component({
  selector: "app-rapprochementdes-stocks-forms-information",
  templateUrl: "./rapprochementdes-stocks-forms-information.component.html",
  styleUrls: ["./rapprochementdes-stocks-forms-information.component.scss"],
})
export class RapprochementdesStocksFormsInformationComponent implements OnInit {
  @Input() camp!: RapprochementDesStocks;
  addform: FormGroup;

  divisionNames: string[] = [];
  selectedDivisionName: string = "";

  constructor(
    private sharedService: SharedService,
    private rapprochementDesStockService: RapprochementdesStockService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      dateDeDebut: new FormControl(),
      dateDeDebutDeReception: new FormControl(),
      quantiteDeDepart: new FormControl(0),
      valeurUnitaireDeDepart: new FormControl(),
      valeurDeDepart: new FormControl(),
      drapeauFerme: new FormControl(""),
      consignationComplexeBondecommandeNon: new FormControl(""),
      drapeaudeconsignation: new FormControl(""),
      complexeDeTransfertDeConsignationBonDeCommandeN: new FormControl(""),
      numeroDeReferenceDuTransfertDeConsignation: new FormControl(),
      nomDuCentreDeCouts: new FormControl(""),
      nduCentreDeCouts: new FormControl(),
      dateDeCreation: new FormControl(),
      dateDeFinDeReception: new FormControl(),
      dateDExpiration: new FormControl(),
      typeInstallationDuCentreDeCoutsExterne: new FormControl(""),
      nomDuCentreDeCoutsExterne: new FormControl(""),

      nduCentreDeCoutsExterne: new FormControl(),
      nomDeLaFerme: new FormControl(""),
      ndeLaFerme: new FormControl(),
      typeDeFerme: new FormControl(""),
      dateDinactivite: new FormControl(""),
      irn: new FormControl(""),
      nombreDeReceptions: new FormControl(),
      baseDeRemuneration: new FormControl(""),
      termeDePaiementN: new FormControl(),
      termedePaiementNom: new FormControl(""),
      numeroDeLigneDeCommande: new FormControl(),
      bonDecommandeNon: new FormControl(""),
      commandeAchatcomplexeNon: new FormControl(""),
    });
  }

  get f() {
    return this.addform.controls;
  }

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
