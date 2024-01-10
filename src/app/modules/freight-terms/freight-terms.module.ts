import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FreightTermsRoutingModule } from "./freight-terms-routing.module";
import { FreightermsFormsComponent } from "./components/freighterms-forms/freighterms-forms.component";
import { FreightermsListComponent } from "./components/freighterms-list/freighterms-list.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { FreighttermsFormGeneralComponent } from "./components/freighterms-forms/freightterms-form-general/freightterms-form-general.component";

@NgModule({
  declarations: [
    FreightermsFormsComponent,
    FreightermsListComponent,
    FreighttermsFormGeneralComponent,
  ],
  imports: [CommonModule, FreightTermsRoutingModule, SharedModule],

  providers: [SharedService],
})
export class FreightTermsModule {}
