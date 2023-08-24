import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticUnitRoutingModule } from './logistic-unit-routing.module';
import { LogisticUnitListComponent } from './components/logistic-unit-list/logistic-unit-list.component';
import { LogisticUnitFormsComponent } from './components/logistic-unit-forms/logistic-unit-forms.component';
import { LogisticUnitFormsGeneralComponent } from './components/logistic-unit-forms/logistic-unit-forms-general/logistic-unit-forms-general.component';
import { LogisticUnitFormsInformationComponent } from './components/logistic-unit-forms/logistic-unit-forms-information/logistic-unit-forms-information.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    LogisticUnitListComponent,
    LogisticUnitFormsComponent,
    LogisticUnitFormsGeneralComponent,
    LogisticUnitFormsInformationComponent
  ],
  imports: [
    CommonModule,
    LogisticUnitRoutingModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class LogisticUnitModule { }
