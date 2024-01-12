import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductUsageRoutingModule } from "./product-usage-routing.module";
import { ProductUsageFormsComponent } from "./components/product-usage-forms/product-usage-forms.component";
import { ProductUsageListComponent } from "./components/product-usage-list/product-usage-list.component";
import { ProductUsageFormsGeneralComponent } from "./components/product-usage-forms/product-usage-forms-general/product-usage-forms-general.component";
import { ProductUsageFormsInformationComponent } from "./components/product-usage-forms/product-usage-forms-information/product-usage-forms-information.component";
import { SharedModule } from "app/shared/shared.module";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ProductUsageFormsDetailsComponent } from "./components/product-usage-forms/product-usage-forms-details/product-usage-forms-details.component";

@NgModule({
  declarations: [
    ProductUsageFormsComponent,
    ProductUsageListComponent,
    ProductUsageFormsGeneralComponent,
    ProductUsageFormsInformationComponent,
    ProductUsageFormsDetailsComponent,
  ],
  imports: [
    CommonModule,
    ProductUsageRoutingModule,
    SharedModule,
    MatSlideToggleModule,
  ],
})
export class ProductUsageModule {}
