import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SalesSkuRoutingModule } from "./sales-sku-routing.module";
import { SalesSkuFormComponent } from "./component/sales-sku-form/sales-sku-form.component";
import { SalesSkuListComponent } from "./component/sales-sku-list/sales-sku-list.component";
import { SalesSkuFormGeneralComponent } from "./component/sales-sku-form/sales-sku-form-general/sales-sku-form-general.component";
import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { TrashsalesskuComponent } from "./trashsalessku/trashsalessku.component";

@NgModule({
  declarations: [
    SalesSkuFormComponent,
    SalesSkuListComponent,
    SalesSkuFormGeneralComponent,
    TrashsalesskuComponent,
  ],
  imports: [CommonModule, SalesSkuRoutingModule, SharedModule],
  providers: [SharedService],
})
export class SalesSkuModule {}
