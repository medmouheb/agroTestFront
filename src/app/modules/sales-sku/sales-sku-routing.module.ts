import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalesSkuListComponent } from "./component/sales-sku-list/sales-sku-list.component";

const routes: Routes = [
  {
    path: "",
    component: SalesSkuListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesSkuRoutingModule {}
