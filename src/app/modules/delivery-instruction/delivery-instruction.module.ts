import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { DeliveryFormGeneralComponent } from './components/delivery-form/delivery-form-general/delivery-form-general.component';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryListComponent } from './components/delivery-list/delivery-list.component';
import { DeliveryInstructionRoutingModule } from './delivery-instruction-routing.module';




@NgModule({
  declarations: [
    DeliveryFormComponent,
    DeliveryListComponent,
    DeliveryFormGeneralComponent,
 
  ],
  imports: [
    CommonModule,
    DeliveryInstructionRoutingModule, SharedModule
  ],
  providers: [SharedService],
})
export class DeliveryInstructionModule { }
