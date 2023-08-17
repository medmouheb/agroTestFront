import { Component, OnInit ,Input} from '@angular/core';
import { Commande } from 'app/modules/commande/models/commande.model';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: 'app-commande-form-general',
  templateUrl: './commande-form-general.component.html',
  styleUrls: ['./commande-form-general.component.scss']
})
export class CommandeFormGeneralComponent implements OnInit {

  @Input() commande!: Commande;

  addform: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addform = new FormGroup({
      paymentTermCode: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      paymentTermName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      dateSold: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      daysAfterCurrentMonth: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      deliveryDate: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      invoiceDate: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),

      receiveDate: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      shipDate: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ])
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }
  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    this.sharedService.setIsActive(true);
  }

  get f() {
    return this.addform.controls;
  }


}
