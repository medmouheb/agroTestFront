import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { SharedService } from '../company/services/shared.service';
import { SalesFormCurrencyComponent } from './sales-form/sales-form-currency/sales-form-currency.component';
import { SalesFormGeneralComponent } from './sales-form/sales-form-general/sales-form-general.component';
import { SalesFormLocalComponent } from './sales-form/sales-form-local/sales-form-local.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesRoutingModule } from './sales-routing.module';
import { TrasSAComponent } from './tras-sa/tras-sa.component';
import { TrashsalesComponent } from './trashsales/trashsales.component';


@NgModule({
  declarations: [
    SalesFormComponent,
    SalesListComponent,
    SalesFormCurrencyComponent,
    SalesFormGeneralComponent,
    SalesFormLocalComponent,
    TrasSAComponent,
    TrashsalesComponent 
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule
  ],
  providers:[SharedService]
})
export class SalesModule { }
