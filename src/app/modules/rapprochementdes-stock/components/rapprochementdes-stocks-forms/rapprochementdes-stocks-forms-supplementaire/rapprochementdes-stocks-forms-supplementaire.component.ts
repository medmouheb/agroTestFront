import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { RapprochementDesStocks } from 'app/modules/rapprochementdes-stock/model/rapprochementdes-stock';
import { RapprochementdesStockService } from 'app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service';

@Component({
  selector: 'app-rapprochementdes-stocks-forms-supplementaire',
  templateUrl: './rapprochementdes-stocks-forms-supplementaire.component.html',
  styleUrls: ['./rapprochementdes-stocks-forms-supplementaire.component.scss']
})
export class RapprochementdesStocksFormsSupplementaireComponent implements OnInit {

  @Input() camp!: RapprochementDesStocks;
  addform: FormGroup;

  divisionNames: string[] = [];
  selectedDivisionName: string = '';




  constructor(private sharedService: SharedService,
    private rapprochementDesStockService: RapprochementdesStockService

    ) {}

    ngOnInit(): void {
      this.initForm();
    }
  

    
  initForm() {
    this.addform = new FormGroup({  
      emplacementDeDestinationDuTransfertNon: new FormControl(""),
      numeroDeLotDeDestinationDuTransfert: new FormControl(),
      nduProduitDeDestinationDuTransfert: new FormControl(),
      nomDuProduitDeDestinationDuTransfert: new FormControl(""),
      numeroDeReferenceDeLaDestinationDuTransfert: new FormControl(),
      idEntiteDeTransactionDeDestinationDeTransfert: new FormControl(""),
      nomDeEntiteDeLaTransactionDeDestinationDuTransfert: new FormControl(""),
      typeEntrepotDeDestinationDuTransfert: new FormControl(""),
      emplacementDeLaSourceDeTransfertNon: new FormControl(""),
      typeEnregistrement: new FormControl(""),
      numeroDeLotSourceDeTransfert: new FormControl(),
      nduProduitSourceDeTransfert: new FormControl(),
      nomDuProduitSourceDeTransfert: new FormControl(""),
      typeEntrepotOrigineDuTransfert: new FormControl(""),
      descriptionDeUnite: new FormControl(""),
      valeurUnitaire: new FormControl(),
      unitesPar: new FormControl(""),
      nduVendeur: new FormControl(),
      nomDuVendeur: new FormControl(""),
      noSKUDuFournisseur: new FormControl(),
      nomSKUDuFournisseur: new FormControl(""),
      typeEntrepot: new FormControl(""),

  })
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

  minIwillaya: boolean = false


}
