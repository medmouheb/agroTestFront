import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DriversRoutingModule } from "./drivers-routing.module";
import { DriversUnitListComponent } from "./components/drivers-unit-list/drivers-unit-list.component";
import { DriversUnitFormsComponent } from "./components/drivers-unit-forms/drivers-unit-forms.component";
import { DriversUnitFormsInformationComponent } from "./components/drivers-unit-forms/drivers-unit-forms-information/drivers-unit-forms-information.component";
import { DriversUnitFormsGeneralComponent } from "./components/drivers-unit-forms/drivers-unit-forms-general/drivers-unit-forms-general.component";
import { SharedModule } from "app/shared/shared.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { DriversUnitFormsWorkingTimeComponent } from "./components/drivers-unit-forms/drivers-unit-forms-working-time/drivers-unit-forms-working-time.component";

@NgModule({
  declarations: [
    DriversUnitListComponent,
    DriversUnitFormsComponent,
    DriversUnitFormsInformationComponent,
    DriversUnitFormsGeneralComponent,
    DriversUnitFormsWorkingTimeComponent,
  ],
  imports: [
    CommonModule,
    DriversRoutingModule,
    SharedModule,
    MatSlideToggleModule,
  ],
})
export class DriversModule {}
