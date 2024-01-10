import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChargeRoutingModule } from "./charge-routing.module";
import { ChargeFormGeneralComponent } from "./component/charge-form/charge-form-general/charge-form-general.component";
import { ChargeFormComponent } from "./component/charge-form/charge-form.component";
import { ChargeListComponent } from "./component/charge-list/charge-list.component";
import { SharedModule } from "../../shared/shared.module";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [
    ChargeFormGeneralComponent,
    ChargeFormComponent,
    ChargeListComponent,
  ],
  imports: [CommonModule, ChargeRoutingModule, SharedModule],
  providers: [SharedService],
})
export class ChargeModule {}
