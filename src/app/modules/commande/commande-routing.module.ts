import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommandeListComponent } from "./component/commande-list/commande-list.component";

const routes: Routes = [
  {
    path: "",
    component: CommandeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommandeRoutingModule {}
