import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../company/services/shared.service';
import { Router } from "@angular/router";
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { BeginninginventoryService } from '../../../services/beginninginventory.service';
@Component({
  selector: 'app-beginninginventory-transactions',
  templateUrl: './beginninginventory-transactions.component.html',
  styleUrls: ['./beginninginventory-transactions.component.scss']
})
export class BeginninginventoryTransactionsComponent implements OnInit {

    @Input() camp!: BeginningInventory;
    addform: FormGroup;

    // Array to hold the list of companies

    constructor(private sharedService: SharedService,


      ) {}

      ngOnInit(): void {
        this.camp.codeDeTransaction="Beginning Inventory"
        if(! this.camp.temps){
          this.camp.temps= "00:00"
        }
        this.initForm();
      }

      showvalue(e: any) {
        console.log("rerer:", e.target.value)
      }

    initForm() {
      this.addform = new FormGroup({
        codeDeTransaction: new FormControl(this.camp.codeDeTransaction),
        dateDeEvenement: new FormControl(this.camp.dateDeEvenement),
        dateExpiration: new FormControl(this.camp.dateExpiration),
        temps: new FormControl(this.camp.temps),
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

  minIwillaya: boolean = false


}
