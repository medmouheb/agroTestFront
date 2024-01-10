import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VehiclesRoutingModule } from "./vehicles-routing.module";
import { VehiclesUnitListComponent } from "./components/vehicles-unit-list/vehicles-unit-list.component";
import { VehiclesUnitFormsComponent } from "./components/vehicles-unit-forms/vehicles-unit-forms.component";
import { VehiclesUnitFormsGeneralComponent } from "./components/vehicles-unit-forms/vehicles-unit-forms-general/vehicles-unit-forms-general.component";
import { VehiclesUnitFormsInformationComponent } from "./components/vehicles-unit-forms/vehicles-unit-forms-information/vehicles-unit-forms-information.component";
import { SharedModule } from "app/shared/shared.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { VehiclesUnitFormsHistoriqueDeMaintenanceComponent } from "./components/vehicles-unit-forms/vehicles-unit-forms-historique-de-maintenance/vehicles-unit-forms-historique-de-maintenance.component";

@NgModule({
  declarations: [
    VehiclesUnitListComponent,
    VehiclesUnitFormsComponent,
    VehiclesUnitFormsGeneralComponent,
    VehiclesUnitFormsInformationComponent,
    VehiclesUnitFormsHistoriqueDeMaintenanceComponent,
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule,
    MatSlideToggleModule,
  ],
})
export class VehiclesModule {}
