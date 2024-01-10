import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VendorSKUListComponent } from "./component/vendor-sku-list/vendor-sku-list.component";

const routes: Routes = [
  {
    path: "",
    component: VendorSKUListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorSKURoutingModule {}
