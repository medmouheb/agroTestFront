import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeliveryListComponent } from "./components/delivery-list/delivery-list.component";

const routes: Routes = [
  {
    path: "",
    component: DeliveryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryInstructionRoutingModule {}
