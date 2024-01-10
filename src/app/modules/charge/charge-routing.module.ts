import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChargeListComponent } from "./component/charge-list/charge-list.component";
const routes: Routes = [
  {
    path: "",
    component: ChargeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeRoutingModule {}
