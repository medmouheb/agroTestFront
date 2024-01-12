import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SharedModule } from "app/shared/shared.module";
import { SharedService } from "../company/services/shared.service";
import { FarmsFormContractComponent } from './components/farms-form/farms-form-contract/farms-form-contract.component';
import { FarmsFormDistanceComponent } from './components/farms-form/farms-form-distance/farms-form-distance.component';
import { FarmsFormFeedmilsComponent } from './components/farms-form/farms-form-feedmils/farms-form-feedmils.component';
import { FarmsFormGeneralComponent } from "./components/farms-form/farms-form-general/farms-form-general.component";
import { FarmsFormLiveHaulComponent } from './components/farms-form/farms-form-live-haul/farms-form-live-haul.component';
import { FarmsFormLocalisationComponent } from "./components/farms-form/farms-form-localisation/farms-form-localisation.component";
import { FarmsFormPaiementComponent } from './components/farms-form/farms-form-paiement/farms-form-paiement.component';
import { FarmsFormProductComponent } from './components/farms-form/farms-form-product/farms-form-product.component';
import { FarmsFormProjectionComponent } from './components/farms-form/farms-form-projection/farms-form-projection.component';
import { FarmsFormRessourceComponent } from './components/farms-form/farms-form-ressource/farms-form-ressource.component';
import { FarmsFormVisitorsComponent } from './components/farms-form/farms-form-visitors/farms-form-visitors.component';
import { FarmsFormWarehouseComponent } from './components/farms-form/farms-form-warehouse/farms-form-warehouse.component';
import { FarmsFormComponent } from "./components/farms-form/farms-form.component";
import { FarmsListComponent } from "./components/farms-list/farms-list.component";
import { FarmsRoutingModule } from "./farms-routing.module";
import { FarmsFormPlaningComponent } from './components/farms-form/farms-form-planing/farms-form-planing.component';
import { FarmsFormPayeComponent } from './components/farms-form/farms-form-paye/farms-form-paye.component';


@NgModule({
  declarations: [
    FarmsListComponent,
    FarmsFormComponent,
    FarmsFormGeneralComponent,
    FarmsFormLocalisationComponent,
    FarmsFormRessourceComponent,
    FarmsFormVisitorsComponent,
    FarmsFormContractComponent,
    FarmsFormDistanceComponent,
    FarmsFormPaiementComponent,
    FarmsFormProjectionComponent,
    FarmsFormLiveHaulComponent,
    FarmsFormFeedmilsComponent,
   
    FarmsFormWarehouseComponent,
    FarmsFormProductComponent,
    FarmsFormPlaningComponent,
    FarmsFormPayeComponent,
  ],
  imports: [CommonModule, FarmsRoutingModule, SharedModule],
  providers: [SharedService],
})
export class FarmsModule {}
