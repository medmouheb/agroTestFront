import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WillayaRoutingModule } from "./willaya-routing.module";
import { WillayaFormComponent } from "./components/willaya-form/willaya-form.component";
import { WillayaFormGeneralComponent } from "./components/willaya-form/willaya-form-general/willaya-form-general.component";
import { WillayaListComponent } from "./components/willaya-list/willaya-list.component";
import { SharedService } from "../company/services/shared.service";
import { SharedModule } from "app/shared/shared.module";
import { TrashwilComponent } from "./trashwil/trashwil.component";

@NgModule({
  declarations: [
    WillayaFormComponent,
    WillayaFormGeneralComponent,
    WillayaListComponent,
    TrashwilComponent,
  ],
  imports: [CommonModule, WillayaRoutingModule, SharedModule],
  providers: [SharedService],
})
export class WillayaModule {}
