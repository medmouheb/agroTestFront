import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VehiclesUnitListComponent } from "./components/vehicles-unit-list/vehicles-unit-list.component";

const routes: Routes = [
  {
    path: "",
    component: VehiclesUnitListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
