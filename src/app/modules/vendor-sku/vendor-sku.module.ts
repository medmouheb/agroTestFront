import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorSKUFormComponent } from './component/vendor-sku-form/vendor-sku-form.component';
import { VendorSKUListComponent } from './component/vendor-sku-list/vendor-sku-list.component';
import { VendorSKUFormGeneralComponent } from './component/vendor-sku-form/vendor-sku-form-general/vendor-sku-form-general.component';

import { VendorSKURoutingModule } from './vendor-sku-routing.module';
import { SharedService } from '../company/services/shared.service';
import { SharedModule } from 'app/shared/shared.module';
import { TrashvendskuComponent } from './trashvendsku/trashvendsku.component';



@NgModule({
  declarations: [
    VendorSKUFormComponent,
    VendorSKUListComponent,
    VendorSKUFormGeneralComponent,
    TrashvendskuComponent
  ],
  imports: [
    CommonModule,SharedModule, VendorSKURoutingModule
  ],
  providers: [SharedService],

})
export class VendorSKUModule { }
