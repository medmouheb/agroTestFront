import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";

import { VehicleTypeRoutingModule } from './vehicle-type-routing.module';
import { VehicleTypeListComponent } from './component/vehicle-type-list/vehicle-type-list.component';
import { VehicleTypeFormComponent } from './component/vehicle-type-form/vehicle-type-form.component';
import { VehicleTypeFormGeneraleComponent } from './component/vehicle-type-form/vehicle-type-form-generale/vehicle-type-form-generale.component';
import { VehicleTypeFormDetailComponent } from './component/vehicle-type-form/vehicle-type-form-detail/vehicle-type-form-detail.component';


@NgModule({
  declarations: [
    VehicleTypeListComponent,
    VehicleTypeFormComponent,
    VehicleTypeFormGeneraleComponent,
    VehicleTypeFormDetailComponent
  ],
  imports: [
    CommonModule,
    VehicleTypeRoutingModule,
    SharedModule,
    MatSlideToggleModule
  ],
  providers: [SharedService],

})
export class VehicleTypeModule { }
