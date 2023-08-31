import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapprochementdesStocksListComponent } from './components/rapprochementdes-stocks-list/rapprochementdes-stocks-list.component';

const routes: Routes = [
  {
    path: '',
    component:RapprochementdesStocksListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapprochementdesStockRoutingModule { }
