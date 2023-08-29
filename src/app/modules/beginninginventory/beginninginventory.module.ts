import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "app/shared/shared.module";
import { BeginninginventoryRoutingModule } from './beginninginventory-routing.module';
import { SharedService } from '../company/services/shared.service';
import { BeginninginventoryListComponent } from './components/beginninginventory-list/beginninginventory-list.component';
import { BeginninginventoryAddComponent } from './components/beginninginventory-add/beginninginventory-add.component';
import { BeginninginventoryDetailsComponent } from './components/beginninginventory-add/beginninginventory-details/beginninginventory-details.component';
import { BeginninginventoryTransactionsComponent } from './components/beginninginventory-add/beginninginventory-transactions/beginninginventory-transactions.component';
import { BeginninginventoryProductsComponent } from './components/beginninginventory-add/beginninginventory-products/beginninginventory-products.component';


@NgModule({
    declarations: [
        BeginninginventoryListComponent,
        BeginninginventoryAddComponent,
        BeginninginventoryTransactionsComponent,
        BeginninginventoryProductsComponent,
        BeginninginventoryDetailsComponent],
  imports: [
      CommonModule,
      BeginninginventoryRoutingModule, SharedModule,
     
    ],
    providers: [SharedService]
})
export class BeginninginventoryModule { }
