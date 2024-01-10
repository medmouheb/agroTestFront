import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RapprochementdesStockRoutingModule } from "./rapprochementdes-stock-routing.module";
import { RapprochementdesStocksFormsComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms.component";
import { RapprochementdesStocksListComponent } from "./components/rapprochementdes-stocks-list/rapprochementdes-stocks-list.component";
import { RapprochementdesStocksFormsGeneralComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms-general/rapprochementdes-stocks-forms-general.component";
import { RapprochementdesStocksFormsSupplementaireComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms-supplementaire/rapprochementdes-stocks-forms-supplementaire.component";
import { RapprochementdesStocksFormsDetailsComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms-details/rapprochementdes-stocks-forms-details.component";
import { RapprochementdesStocksFormsInformationComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms-information/rapprochementdes-stocks-forms-information.component";
import { SharedModule } from "app/shared/shared.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { RapprochementdesStocksFormsPlusComponent } from "./components/rapprochementdes-stocks-forms/rapprochementdes-stocks-forms-plus/rapprochementdes-stocks-forms-plus.component";

@NgModule({
  declarations: [
    RapprochementdesStocksFormsComponent,
    RapprochementdesStocksListComponent,
    RapprochementdesStocksFormsGeneralComponent,
    RapprochementdesStocksFormsSupplementaireComponent,
    RapprochementdesStocksFormsDetailsComponent,
    RapprochementdesStocksFormsInformationComponent,
    RapprochementdesStocksFormsPlusComponent,
  ],
  imports: [
    CommonModule,
    RapprochementdesStockRoutingModule,
    SharedModule,
    MatSlideToggleModule,
  ],
})
export class RapprochementdesStockModule {}
