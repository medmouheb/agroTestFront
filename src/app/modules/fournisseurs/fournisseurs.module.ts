import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { FournisseursFormGeneralComponent } from "./components/fournisseurs-form/fournisseurs-form-general/fournisseurs-form-general.component";
import { FournisseursFormInformationComponent } from "./components/fournisseurs-form/fournisseurs-form-information/fournisseurs-form-information.component";
import { FournisseursFormShippingComponent } from "./components/fournisseurs-form/fournisseurs-form-shipping/fournisseurs-form-shipping.component";
import { FournisseursFormVendorSkuComponent } from "./components/fournisseurs-form/fournisseurs-form-vendor-sku/fournisseurs-form-vendor-sku.component";
import { FournisseursFormComponent } from "./components/fournisseurs-form/fournisseurs-form.component";
import { FournisseursListComponent } from "./components/fournisseurs-list/fournisseurs-list.component";
import { FournisseursRoutingModule } from "./fournisseurs-routing.module";
import { TrashFouComponent } from "./trash/trash.component";

@NgModule({
  declarations: [
    FournisseursListComponent,
    FournisseursFormComponent,
    FournisseursFormGeneralComponent,
    FournisseursFormInformationComponent,
    FournisseursFormVendorSkuComponent,
    FournisseursFormShippingComponent,
    TrashFouComponent,
  ],
  imports: [CommonModule, FournisseursRoutingModule, SharedModule],
  providers: [SharedService],
})
export class FournisseursModule {}
