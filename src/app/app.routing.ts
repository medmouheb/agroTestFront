import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./login/login.component";
import { UsersListComponent } from "./modules/administration/users-list/users-list.component";
import { VerifyEmailComponent } from "./modules/administration/verify-email/verify-email.component";
import { TrashCComponent } from "./modules/company/trash/trashC.component";
import { CostTrashComponent } from "./modules/cost-center/trash/costtrash.component";
import { CurrTrashComponent } from "./modules/currency/trash/curtrash.component";
import { TrashDComponent } from "./modules/division/trash/trashD.component";
import { TrashFouComponent } from "./modules/fournisseurs/trash/trash.component";
import { TrashGComponent } from "./modules/growout/trash/trashG.component";
import { TrashsalesskuComponent } from "./modules/sales-sku/trashsalessku/trashsalessku.component";
import { TrasSAComponent } from "./modules/sales/tras-sa/tras-sa.component";
import { SimulatorMainPageComponent } from "./modules/simulator/simulator-main-page/simulator-main-page.component";
import { SimulatorResultsComponent } from "./modules/simulator/simulator-results/simulator-results.component";
import { TrashvendskuComponent } from "./modules/vendor-sku/trashvendsku/trashvendsku.component";
import { TrashWComponent } from "./modules/warehouse/trash/trashw.component";
import { TrashwilComponent } from "./modules/willaya/trashwil/trashwil.component";
import { TrashComponent } from "./shared/components/trash/trash.component";
import { StartPageComponent } from "./start-page/start-page.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
  },

  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "signup",
    component: SignUpComponent,
    pathMatch: "full",
  },
  {
    path: "verify",
    component: VerifyEmailComponent,
  },
  {
    path: "home",
    component: StartPageComponent,
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "dashboard", component: HomeComponent },
      { path: "dashboard/products", component: DashboardComponent },
      { path: "start", component: StartPageComponent },
      {
        path: "trash",
        component: TrashComponent,
      },
      {
        path: "company/trash", //
        component: TrashCComponent,
      },
      {
        path: "costCenter/trash",
        component: CostTrashComponent,
      },
      {
        path: "vendorsku/trash",
        component: TrashvendskuComponent,
      },
      {
        path: "salessku/trash",
        component: TrashsalesskuComponent,
      },
      {
        path: "willaya/trash",
        component: TrashwilComponent,
      },
      {
        path: "warehouses/trash",
        component: TrashWComponent,
      },
      {
        path: "division/trash",
        component: TrashDComponent,
      },
      {
        path: "sales/trash",
        component: TrasSAComponent,
      },
      {
        path: "currency/trash",
        component: CurrTrashComponent,
      },
      {
        path: "growout/trash",
        component: TrashGComponent,
      },
      {
        path: "fournisseurs/trash",
        component: TrashFouComponent,
      },
      {
        path: "simulatorMain/results",
        component: SimulatorResultsComponent,
      },
      {
        path: "simulator/home",
        component: SimulatorMainPageComponent,
      },

      {
        path: "company", //
        loadChildren: () =>
          import("./modules/company/company.module").then(
            (m) => m.CompanyModule,
          ),
      },
      {
        path: "costCenter",
        loadChildren: () =>
          import("./modules/cost-center/cost-center.module").then(
            (m) => m.CostCenterModule,
          ),
      },
      {
        path: "salesku",
        loadChildren: () =>
          import("./modules/sales-sku/sales-sku.module").then(
            (m) => m.SalesSkuModule,
          ),
      },
      {
        path: "Field-product",
        loadChildren: () =>
          import("./modules/produits/produits.module").then(
            (m) => m.ProduitsModule,
          ),
      },
      {
        path: "Rapprochement-des-stocks",
        loadChildren: () =>
          import(
            "./modules/rapprochementdes-stock/rapprochementdes-stock.module"
          ).then((m) => m.RapprochementdesStockModule),
      },
      {
        path: "ProductUsage",
        loadChildren: () =>
          import("./modules/product-usage/product-usage.module").then(
            (m) => m.ProductUsageModule,
          ),
      },
      {
        path: "Delivery",
        loadChildren: () =>
          import(
            "./modules/delivery-instruction/delivery-instruction.module"
          ).then((m) => m.DeliveryInstructionModule),
      },
      {
        path: "shipmethode",
        loadChildren: () =>
          import("./modules/ship-methods/ship-methods.module").then(
            (m) => m.ShipMethodsModule,
          ),
      },
      {
        path: "freightterms",
        loadChildren: () =>
          import("./modules/freight-terms/freight-terms.module").then(
            (m) => m.FreightTermsModule,
          ),
      },

      {
        path: "fournisseurs",
        loadChildren: () =>
          import("./modules/fournisseurs/fournisseurs.module").then(
            (m) => m.FournisseursModule,
          ),
      },
      {
        path: "sanitation",
        loadChildren: () =>
          import("./modules/sanitation/sanitation.module").then(
            (m) => m.SanitationModule,
          ),
      },
      {
        path: "warehouses",
        loadChildren: () =>
          import("./modules/warehouse/warehouse.module").then(
            (m) => m.WarehouseModule,
          ),
      },
      {
        path: "Initialinventory",
        loadChildren: () =>
          import("./modules/beginninginventory/beginninginventory.module").then(
            (m) => m.BeginninginventoryModule,
          ),
      },
      {
        path: "farms",
        loadChildren: () =>
          import("./modules/farms/farms.module").then((m) => m.FarmsModule),
      },
      {
        path: "currency",
        loadChildren: () =>
          import("./modules/currency/currency.module").then(
            (m) => m.CurrencyModule,
          ),
      },
      {
        path: "division",
        loadChildren: () =>
          import("./modules/division/division.module").then(
            (m) => m.DivisionModule,
          ),
      },
      {
        path: "growout",
        loadChildren: () =>
          import("./modules/growout/growout.module").then(
            (m) => m.GrowoutModule,
          ),
      },
      {
        path: "vehicule",
        loadChildren: () =>
          import("./modules/vehicule/vehicule.module").then(
            (m) => m.VehiculeModule,
          ),
      },
      {
        path: "vehicleType",
        loadChildren: () =>
          import("./modules/vehicle-type/vehicle-type.module").then(
            (m) => m.VehicleTypeModule,
          ),
      },
      {
        path: "willaya",
        loadChildren: () =>
          import("./modules/willaya/willaya.module").then(
            (m) => m.WillayaModule,
          ),
      },
      {
        path: "animal-product",
        loadChildren: () =>
          import("./modules/animal-product/animal-product.module").then(
            (m) => m.AnimalProductModule,
          ),
      },
      {
        path: "diver",
        loadChildren: () =>
          import("./modules/diver/diver.module").then((m) => m.DiverModule),
      },
      {
        path: "egg-product",
        loadChildren: () =>
          import("./modules/egg-product/egg-product.module").then(
            (m) => m.EggProductModule,
          ),
      },
      {
        path: "feed-mill",
        loadChildren: () =>
          import("./modules/feed-mill/feed-mill.module").then(
            (m) => m.FeedMillModule,
          ),
      },
      {
        path: "hatchery",
        loadChildren: () =>
          import("./modules/hatchery/hatchery.module").then(
            (m) => m.HatcheryModule,
          ),
      },
      {
        path: "plant",
        loadChildren: () =>
          import("./modules/plant/plant.module").then((m) => m.PlantModule),
      },
      {
        path: "sales",
        loadChildren: () =>
          import("./modules/sales/sales.module").then((m) => m.SalesModule),
      },
      {
        path: "live-stock-product",
        loadChildren: () =>
          import("./modules/live-stock-product/live-stock-product.module").then(
            (m) => m.LiveStockProductModule,
          ),
      },
      {
        path: "animal-product",
        loadChildren: () =>
          import("./modules/animal-product/animal-product.module").then(
            (m) => m.AnimalProductModule,
          ),
      },
      {
        path: "vendorsku",
        loadChildren: () =>
          import("./modules/vendor-sku/vendor-sku.module").then(
            (m) => m.VendorSKUModule,
          ),
      },
      {
        path: "feed-product",
        loadChildren: () =>
          import("./modules/feed-product/feed-product.module").then(
            (m) => m.FeedProductModule,
          ),
      },
      {
        path: "ordermangment",
        loadChildren: () =>
          import("./modules/ordermanagment/ordermanagment.module").then(
            (m) => m.OrdermanagmentModule,
          ),
      },
      {
        path: "logistic",
        loadChildren: () =>
          import("./modules/logistic/logistic.module").then(
            (m) => m.LogisticModule,
          ),
      },
      {
        path: "symtoms",
        loadChildren: () =>
          import("./modules/symtoms/symtoms.module").then(
            (m) => m.SymtomsModule,
          ),
      },
      {
        path: "country",
        loadChildren: () =>
          import("./modules/country/country.module").then(
            (m) => m.CountryModule,
          ),
      },
      {
        path: "willaya",
        loadChildren: () =>
          import("./modules/willaya/willaya.module").then(
            (m) => m.WillayaModule,
          ),
      },
      {
        path: "tax",
        loadChildren: () =>
          import("./modules/tax/tax.module").then((m) => m.TaxModule),
      },
      {
        path: "vihicule",
        loadChildren: () =>
          import("./modules/vihicule/vihicule.module").then(
            (m) => m.VihiculeModule,
          ),
      },
      {
        path: "diver",
        loadChildren: () =>
          import("./modules/diver/diver.module").then((m) => m.DiverModule),
      },
      {
        path: "vetenarians",
        loadChildren: () =>
          import("./modules/vetenarians/vetenarians.module").then(
            (m) => m.VetenariansModule,
          ),
      },
      {
        path: "field",
        loadChildren: () =>
          import("./modules/field/field.module").then((m) => m.FieldModule),
      },
      {
        path: "treatment",
        loadChildren: () =>
          import("./modules/treatment/treatment.module").then(
            (m) => m.TreatmentModule,
          ),
      },
      {
        path: "admin/users",
        component: UsersListComponent,
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./modules/administration/administration.module").then(
            (m) => m.AdministrationModule,
          ),
      },
      {
        path: "simulator",
        loadChildren: () =>
          import("./modules/simulator/simulator.module").then(
            (m) => m.SiumulatorModule,
          ),
      },

      {
        path: "commandes",
        loadChildren: () =>
          import("./modules/commande/commande.module").then(
            (m) => m.CommandeModule,
          ),
      },

      {
        path: "charges",
        loadChildren: () =>
          import("./modules/charge/charge.module").then((m) => m.ChargeModule),
      },

      {
        path: "airports",
        loadChildren: () =>
          import("./modules/airport/airport.module").then(
            (m) => m.AirportModule,
          ),
      },
      {
        path: "vehicles",
        loadChildren: () =>
          import("./modules/vehicles/vehicles.module").then(
            (m) => m.VehiclesModule,
          ),
      },
      {
        path: "drivers",
        loadChildren: () =>
          import("./modules/drivers/drivers.module").then(
            (m) => m.DriversModule,
          ),
      },
      {
        path: "logisticUnit",
        loadChildren: () =>
          import("./modules/logistic-unit/logistic-unit.module").then(
            (m) => m.LogisticUnitModule,
          ),
      },
      {
        path: "seaports",
        loadChildren: () =>
          import("./modules/seaport/seaport.module").then(
            (m) => m.SeaportModule,
          ),
      },
      {
        path: "reasons",
        loadChildren: () =>
          import("./modules/reason-code/reason-code.module").then(
            (m) => m.ReasonCodeModule,
          ),
      },
      {
        path: "manufacturers",
        loadChildren: () =>
          import("./modules/manufacturer/manufacturer.module").then(
            (m) => m.ManufacturerModule,
          ),
      },
      {
        path: "productcategories",
        loadChildren: () =>
          import("./modules/product-category/product-category.module").then(
            (m) => m.ProductCategoryModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
