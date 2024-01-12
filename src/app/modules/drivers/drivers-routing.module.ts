import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DriversUnitListComponent } from "./components/drivers-unit-list/drivers-unit-list.component";

const routes: Routes = [
  {
    path: "",
    component: DriversUnitListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriversRoutingModule {}
