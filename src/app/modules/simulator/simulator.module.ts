import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SiumulatorRoutingModule } from "./simulator-routing.module";
import { SharedModule } from "app/shared/shared.module";
import { SimulatorMainPageComponent } from "./simulator-main-page/simulator-main-page.component";
import { SimulatorResultsComponent } from "./simulator-results/simulator-results.component";
import { GanttModule } from "@progress/kendo-angular-gantt";



@NgModule({
  declarations: [
    SimulatorMainPageComponent , SimulatorResultsComponent
  ],
  imports: [CommonModule, SiumulatorRoutingModule, SharedModule , GanttModule],
  providers: [],
})
export class SiumulatorModule {}
