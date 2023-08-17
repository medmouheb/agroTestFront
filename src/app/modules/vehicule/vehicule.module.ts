import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculeRoutingModule } from './vehicule-routing.module';
import { VehiculeFormsComponent } from './components/vehicule-forms/vehicule-forms.component';
import { VehiculeListComponent } from './components/vehicule-list/vehicule-list.component';
import { VehiculeFormsGeneralComponent } from './components/vehicule-forms/vehicule-forms-general/vehicule-forms-general.component';
import { VehiculeFormsInformationComponent } from './components/vehicule-forms/vehicule-forms-information/vehicule-forms-information.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    VehiculeFormsComponent,
    VehiculeListComponent,
    VehiculeFormsGeneralComponent,
    VehiculeFormsInformationComponent
  ],
  imports: [CommonModule, VehiculeRoutingModule, SharedModule,MatSlideToggleModule],
})
export class VehiculeModule {}
