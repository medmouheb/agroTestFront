import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductUsageListComponent } from "./components/product-usage-list/product-usage-list.component";

const routes: Routes = [
  {
    path: "",
    component: ProductUsageListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductUsageRoutingModule {}
