import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { BeginninginventoryService } from '../../../services/beginninginventory.service';
import { SharedService } from 'app/modules/company/services/shared.service';

@Component({
  selector: 'app-beginninginventory-products',
  templateUrl: './beginninginventory-products.component.html',
  styleUrls: ['./beginninginventory-products.component.scss']
})
export class BeginninginventoryProductsComponent implements OnInit {
  @Input() camp!: BeginningInventory;
  addform: FormGroup;
  divisionCompanyNames: string[] = [];
  selectedDivisionCompanyName: string = '';

  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private beginninginventoryService: BeginninginventoryService

    ) {}

    ngOnInit(): void {
      this.initForm();


    }

  initForm() {
    this.addform = new FormGroup({
        typeDeProduit: new FormControl(this.camp.typeDeProduit),
        uniteDinventaire: new FormControl(this.camp.uniteDinventaire),
        prixUnitaire: new FormControl(this.camp.prixUnitaire),
        codeDeLot: new FormControl(this.camp.codeDeLot),
        codeDeLocalisation: new FormControl(this.camp.codeDeLocalisation),
        codeDeReference: new FormControl(this.camp.codeDeReference),
        commentaire: new FormControl(this.camp.commentaire),
        price: new FormControl(this.camp.price),
        Vide: new FormControl(false)
    });

  }

//getAll Campany name from service findbycompany
totalunitprice(){
  this.camp.prixUnitaire= this.camp.price / this.camp.uniteDinventaire;
}


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

  minIwillaya: boolean = false


}
