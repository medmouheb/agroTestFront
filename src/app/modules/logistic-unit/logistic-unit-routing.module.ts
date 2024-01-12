import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogisticUnitListComponent } from './components/logistic-unit-list/logistic-unit-list.component';

const routes: Routes = [
  {
    path: '',
    component:LogisticUnitListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticUnitRoutingModule { }
