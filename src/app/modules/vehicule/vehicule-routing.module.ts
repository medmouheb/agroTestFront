import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VehiculeListComponent } from "./components/vehicule-list/vehicule-list.component";

const routes: Routes = [
  {
    path: "",
    component: VehiculeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculeRoutingModule {}
