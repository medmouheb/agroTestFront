import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SimulatorMainPageComponent } from "./simulator-main-page/simulator-main-page.component";
import { SimulatorResultsComponent } from "./simulator-results/simulator-results.component";

const routes: Routes = [
  {
    path: "",
    component: SimulatorMainPageComponent,
  },
  {
    path: "/simulatorMain/results",
    component: SimulatorResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiumulatorRoutingModule {}
