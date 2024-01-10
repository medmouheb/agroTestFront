import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShipMethodsRoutingModule } from "./ship-methods-routing.module";
import { ShipmethodsFormComponent } from "./components/shipmethods-form/shipmethods-form.component";
import { ShipmethodsListComponent } from "./components/shipmethods-list/shipmethods-list.component";
import { ShipmethodsFormGeneralComponent } from "./components/shipmethods-form/shipmethods-form-general/shipmethods-form-general.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";

@NgModule({
  declarations: [
    ShipmethodsFormComponent,
    ShipmethodsListComponent,
    ShipmethodsFormGeneralComponent,
  ],
  imports: [CommonModule, ShipMethodsRoutingModule, SharedModule],
  providers: [SharedService],
})
export class ShipMethodsModule {}
