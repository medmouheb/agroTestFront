import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreightermsListComponent } from './components/freighterms-list/freighterms-list.component';

const routes: Routes = [{
  path:'',component:FreightermsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightTermsRoutingModule { }
