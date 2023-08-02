import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmethodsListComponent } from './components/shipmethods-list/shipmethods-list.component';

const routes: Routes = [{
  path:'',component:ShipmethodsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShipMethodsRoutingModule { }
