import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WillayaListComponent } from "./components/willaya-list/willaya-list.component";

const routes: Routes = [
  {
    path: "",
    component: WillayaListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WillayaRoutingModule {}
