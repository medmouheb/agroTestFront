import { Component, Input, OnInit } from '@angular/core';
import { Sales } from '../../models/sales';
import { Currency } from 'app/modules/currency/models/currency';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { CompanyService } from 'app/modules/company/services/company.service';
import { CurrencyService } from 'app/modules/currency/services/currency.service';
import { SalesService } from '../../service/sales.service';

@Component({
  selector: 'app-sales-form-currency',
  templateUrl: './sales-form-currency.component.html',
  styleUrls: ['./sales-form-currency.component.scss']
})
export class SalesFormCurrencyComponent implements OnInit {
  @Input() sales: Sales = {};
  currency: Array<Currency> = [];
  saless:Array<Sales> = [];
  addform: FormGroup;
  constructor(
    private sharedService: SharedService,
    private salesservice: SalesService,
    private FormBuilder:FormBuilder,
    private currencyservice:CurrencyService
  ) {}


  ngOnInit(): void {
    this.addform=this.FormBuilder.group({
      idcurrency:['',Validators.required]
    })
    if (!this.sales.currency){
      this.sales.currency={};
    }
    this.getAllcurrency();
  }
getAllcurrency(){
  this.currencyservice.findAll().subscribe({
    next: (result) => (this.currency = result),
      error: (error) => console.error(error),
  })
}
getAlldivision(){
  this.salesservice.findAll().subscribe({
    next: (result) => {this.saless = result;console.log("2==",result)},
    error: (error) => console.error(error),
  });
}
onCompanyChange() {
  console.log(this.sales.currency!.id)

  if (this.sales.currency!.id) {
    this.sales.currency = this.currency.find(
      (elem) => elem.id === this.sales.currency!.id

    );
    console.log(this.sales.currency)
  }
}
}
