import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare const $: any;

declare interface Categries {
  label?: string;
  cateeg?: string;
  id?: string;
  title?: string;
  class?: string;
  icon?: string;
  SubCat?: RouteInfo[];
}

declare interface Categry {
  label?: string;
  path?: string;
  cat?: string;
  title?: string;
  id?: string;
  class?: string;
  icon?: string;
  SubC?: SubCategries[];
}

declare interface SubCategries {
  label?: string;
  path?: string;
  title?: string;
  icon?: string;
  id?: string;
  class?: string;
}
declare interface RouteInfo {
  label?: string;
  category?: string;
  path?: string;
  title?: string;
  icon?: string;
  id?: string;
  class?: string;
  subCategories?: Categry[];

}
export const ROUTES: Categries[] = [
  {
    label: "menu.general-Setups",
    cateeg: "GeneralSetups",
    title: "menu.general-Setups",
    icon: "settings_applications",
    id: "15",
    SubCat: [
      {
        label: "Admin",
        category: "Admin",
        icon: "3p",
        id: "Admin-dropdown",
        subCategories: [
          {
            label: "company",
            path: "/company",
            id: "7",
            title: "menu.companies",
            icon: "corporate_fare",
            class: "",
          },
          // {
          //   label: "Beginning inventories",
          //   path: "/beginninginventory",
          //   title: "menu.beginninginventories",
          //   icon: "inventory_2",
          //   class: "",
          // },
          {
            label: "division",
            path: "/division",
            title: "menu.divisions",
            icon: "key",
            class: "",
          },
          {
            label: "growout",
            path: "/growout",
            title: "menu.growout",
            icon: "location_on",
            class: "",
          },
          {
            label: "costCenter",
            path: "/costCenter",
            title: "menu.costCenter",
            icon: "paid",
            class: "",
          },
          {
            label: "menu.country",
            path: "/country",
            title: "menu.country",
            icon: "location_on",
            class: "",
          },
          {
            label: "willaya",
            path: "/willaya",
            title: "Willaya",
            icon: "location_on",
            class: "",
          },
          {
            label: "currency",
            path: "/currency",
            title: "menu.currency",
            icon: "paid",
            class: "",
          },
          {
            label: "tax",
            path: "/tax",
            title: "menu.tax",
            icon: "paid",
            class: "",
          },

        ],
      },
      {
        label: "Products",
        category: "Products",
        icon: "inventory",
        title: "menu.products",
        id: "Products-dropdown",
        subCategories: [

          {
            id: "dropdown-definitions",
            label: "definitions",
            title: "menu.definitions",
            icon: "note_alt",
            class: "",
            SubC: [{
              label: "Manufacturers",
              path: "/manufacturers",
              title: "menu.manufacturer",
              icon: "manufacturer",
              class: "",
            }, {
              label: "productCat",
              path: "/productcategories",
              title: "menu.productCat",
              icon: "category",
              class: "",
            }

            ]
          },

        ],
      },
      {
        label: "menu.facilities",
        category: "Facilities",
        icon: "corporate_fare",
        id: "Facilities-dropdown",
        title: "menu.facilities",
        subCategories: [
          {
            label: "Hatchery",
            title: "Hatchery",
            icon: "corporate_fare",
            id: "Hatchery-dropdown",
            class: "",
            SubC: [
              {
                title: "menu.Hatchery",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                title: "menu.Setter-capacity",
                icon: "corporate_fare",
                class: "",
                path: "/start",

              },
              {
                title: "menu.Hatcher-capacity",
                icon: "corporate_fare",
                path: "/start",

                class: "",
              },
            ],
          },
          {
            label: "menu.Feed-Mill",
            title: "FeedMill",
            icon: "rate_review",
            id: "FeedMill-dropdown",
            class: "",
            SubC: [],
          },
          {
            label: "menu.Warehouses",
            path: "/warehouses",
            title: "Warehouses",
            icon: "warehouse",
            class: "",
          },
          {
            label: "Plant",
            title: "menu.Plant",
            id: "Plant-dropdown",
            icon: "corporate_fare",
            class: "",
            path: "/start",

            SubC: [
              {
                title: "menu.Plant",
                icon: "corporate_fare",
                class: "",
                path: "/start",

              },
              {
                title: "menu.Weight-scale-using-IOT",
                icon: "warehouse",
                class: "",
                path: "/start",

              },
            ],
          },
        ],
      },
      {
        label: "menu.Live-Stock-Product",
        category: "LiveStockProduct",
        icon: "splitscreen",
        id: "LiveStockProduct-dropdown",
        subCategories: [
          {
            label: "menu.Animal-Product",
            title: "AnimalProduct",
            icon: "corporate_fare",
            id: "AnimalProduct-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.Breed-code-type",
                title: "menu.Breed-code-type",
                icon: "corporate_fare",
                class: "",
                path: "/start",

              },
              {
                label: "menu.Age-assignment",
                title: "menu.Age-assignment",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
            ],
          },
          {
            label: "menu.Egg-Product",
            title: "EggProduct",
            icon: "corporate_fare",
            id: "EggProduct-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.Egg-producte",
                path: "/start",
                title: "menu.Egg-producte",
                icon: "corporate_fare",
                class: "",
              },
              {
                label: "menu.Egg-classe",

                path: "/start",
                title: "menu.Egg-classe",
                icon: "corporate_fare",
                class: "",
              },
            ],
          },
          {
            label: "menu.Feed-Product",
            title: "FeedProduct",
            icon: "corporate_fare",
            id: "FeedProduct-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.Feed-formula-product",
                title: "menu.Feed-formula-product",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },

              {
                label: "menu.Feed-type",
                title: "menu.Feed-type",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                label: "menu.Feed-formula",
                title: "menu.Feed-formula",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                label: "menu.Feed-formula-version",
                title: "menu.Feed-formula-version",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                label: "menu.Feed-formula-price",
                title: "Feed formula-price",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },

            ],
          },
        ],
      },
      {
        label: "menu.Materialhandling",
        category: "Materialhandling",
        icon: "splitscreen",
        id: "Materialhandling-dropdown",
        subCategories: [
          {
            label: "menu.Freightsetup",
            title: "Freightsetup",
            icon: "corporate_fare",
            id: "Freightsetup-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.DeliveryInstruction",
                title: "menu.DeliveryInstruction",
                icon: "corporate_fare",
                class: "",
                path: "/Delivery",

              },
              {
                label: "menu.FreightTerms",
                title: "menu.FreightTerms",
                icon: "corporate_fare",
                class: "",
                path: "/freightterms",

              },

            ],
          },
          {
            label: "menu.transport",
            title: "transport",
            icon: "corporate_fare",
            id: "transport-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.shipmethode",
                title: "menu.shipmethode",
                icon: "corporate_fare",
                class: "",
                path: "/shipmethode",

              },
              {
                label: "menu.Vehiculess",
                title: "menu.Vehiculess",
                icon: "corporate_fare",
                class: "",
                path: "/vehicule",

              },
              //  {
              //   label: "menu.vehicleType",
              //   title: "menu.vehicleType",
              //   icon: "corporate_fare",
              //   class: "",
              //   path: "/vehicleType"
              // },


            ],
          }



        ],
      },
      {
        label: "menu.Order-Mangment",
        category: "ordermangment",
        id: "ordermangment-dropdown",
        icon: "eco",
        subCategories: [
          {
            label: "menu.vendors",
            path: "/fournisseurs",
            title: "menu.vendors",
            icon: "person",

          },
          // {
          //   label: "steps.vendorSKU",
          //   path: "/vendorsku",
          //   title: "vendorSKU",
          //   icon: "corporate_fare",

          // },
          {
            label: "menu.sales",
            path: "/sales",
            title: "sales",
            icon: "corporate_fare",
            class: "",
          },
          {
            label: "menu.Addons",
            title: "Addons",
            icon: "corporate_fare",
            path: "/start",
            id: "AnimalProduct-dropdown",
          },
          {
            label: "menu.Freight",
            title: "Addons",
            icon: "corporate_fare",
            path: "/start",
            id: "AnimalProduct-dropdown",
          },
          {
            label: "menu.Discount-Addond",
            title: "Addons",
            icon: "corporate_fare",
            path: "/start",
            id: "AnimalProduct-dropdown",
          },
          {
            label: "menu.Commissions",
            title: "Commissions",
            icon: "corporate_fare",
            path: "/start",
            id: "AnimalProduct-dropdown",
          },
          {
            label: "menu.Payment-Terms",
            title: "menu.Addons",
            icon: "corporate_fare",
            path: "/start",
            id: "AnimalProduct-dropdown",
          },
        ],
      },

      {
        label: "menu.Logistic",
        category: "logistic",
        id: "logistic-dropdown",
        icon: "trolley",
        subCategories: [
          {
            label: "menu.Vehicule",
            title: "Vehicule",
            icon: "corporate_fare",
            id: "Vehicule-dropdown",
            class: "",
            SubC: [
              {

                path: "/start",
                title: "menu.Vehicule-facility",
                icon: "corporate_fare",
                class: "",
              },
              {
                title: "menu.Vehicule-type",

                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
            ],
          },
          // {
          //   label: "menu.Drivers",
          //   title: "Drivers",
          //   icon: "corporate_fare",
          //   path: "/drivers",
          //   class: "",
          // },
          {
            label: "menu.Driver",
            title: "Driver",
            icon: "corporate_fare",
            id: "Driver-dropdown",
            class: "",
            SubC: [
              {
                title: "menu.Driver-Paye",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                title: "menu.Driver-Vehicule-type",
                icon: "corporate_fare",
                class: "",
                path: "/start",
              },
              {
                path: "/vehicles",
                label: "menu.Vehicles",
                title: "menu.Vehicles",
                icon: "corporate_fare",
                class: "",
              },
              {
                label: "menu.logistic-Unit",
                path: "/logisticUnit",
                title: "menu.logistic-Unit",
                icon: "corporate_fare",
                class: "",
              },
            ],
          },
        ],
      },
      {
        label: "menu.Sanitation",
        category: "Sanitation",
        id: "Sanitation-dropdown",
        icon: "person",
        class: "",
        subCategories: [
          {
            label: "menu.Veterinarians",
            title: "Veterinarians",
            icon: "inventory_2",
            id: "Veterinarians-dropdown",
            class: "",
            SubC: []

          },
          {
            label: "menu.Field-and-Feed-products",
            title: "Medicated",
            id: "Treatments-dropdown",
            icon: "feed",
            class: "",
            SubC: [
              {
                title: "menu.Field ",
                icon: "corporate_fare",
                id: "Field-dropdown",
                path: "/start",
                class: "",
              },
              {
                title: "menu.Feed",
                icon: "corporate_fare",
                id: "Feed-dropdown",
                path: "/start",
                class: "",
              },
            ],
          },
          {
            label: "menu.Symptoms",
            title: "Symptoms",
            id: "Symptoms-dropdown",
            icon: "stream",
            class: "",
            SubC: [


            ],

          },

          {
            label: "menu.Treatments",
            title: "Treatments",
            id: "Treatments-dropdown",
            icon: "stream",
            class: "",
            SubC: [
              {
                title: "menu.Treat",
                icon: "corporate_fare",
                id: "Treatment-dropdown",
                path: "/start",
                class: "",
              },


            ],

          },

        ],
      },
    ],
  },


  {
    label: "menu.Business",
    cateeg: "Business",
    icon: "corporate_fare",
    id: "18",
    SubCat: [
      {
        label: "Agriculture",
        category: "Agriculture",
        icon: "corporate_fare",
        id: "Agriculture-dropdown",
        subCategories: [
          {
            label: "menu.farms",
            path: "/farms",
            title: "menu.farms",
            icon: "agriculture",
            class: "",
          },
          {
            label: "Field-Product",
            path: "/Field-product",
            title: "menu.Simulateur",
            icon: "content_paste",
            class: "",
          },
          {
            label: "menu.Warhouse",
            title: "Warhouse",
            icon: "corporate_fare",
            id: "Warhouse-dropdown",
            class: "",
            SubC: [
              {
                label: "menu.Warhouse",
                path: "/warehouses",
                title: "menu.Warehouses",
                icon: "warehouse",
                class: "",
              },
              {
                label: "Initial inventory",
                path: "/Initialinventory",
                title: "menu.Initialinventory",
                icon: "warehouse",
                class: "",
              }
              , {
                label: "Product Usage",
                path: "/ProductUsage",
                title: "menu.ProductUsage",
                icon: "warehouse",
                class: "",
              },
              {
                label: "Rapprochement-des-stocks",
                path: "/Rapprochement-des-stocks",
                title: "menu.Rapprochement-des-stocks",
                icon: "warehouse",
                class: "",
              },
            ],
          },

          {
            label: "menu.Order-Management",
            title: "menu.Feed-Product",
            icon: "paid",
            class: "",
          },
          {
            label: "menu.Dashbord",
            path: "/dashboard",
            title: "Dashbord",
            icon: "dashboard",
            class: "",
          },
          {
            label: "menu.Simulateur",
            path: "/simulator",
            title: "Simulateur",
            icon: "content_paste",
            class: "",
          },
          {
            label: "menu.Logistic",
            path: "/logistic",
            title: "Logistic",
            icon: "agriculture",
            class: "",
          },
          {
            label: "menu.Phyto-Sanitation",
            path: "/sanitation",
            title: "Sanitation or phyto-sanitation",
            icon: "inventory_2",
            class: "",
          },
          {
            label: "menu.irrigation",
            path: "/sanitation",
            title: "Irrigation",
            icon: "inventory_2",
            class: "",
          },
        ],
      },
      {
        label: "menu.Bovine",
        category: "Bouvine",
        icon: "person",
        class: "",
      },
      {
        label: "menu.Poultry",
        category: "Poltry",
        icon: "person",
        id: "8",
        class: "",
      },

    ],
  },
  {
    label: "menu.Reporting",
    cateeg: "notifications",
    icon: "bubble_chart",
    class: "",
  },
  {
    label: "menu.Accounting",
    cateeg: "notifications",
    icon: "bubble_chart",
    class: "",
  },
  {
    label: "menu.Registtery",
    cateeg: "notifications",
    icon: "bubble_chart",
    class: "",
  },
];



@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  redirect() {
    console.log("ooo");
    this.router.navigate(["/start"]);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  indexBig: any
  setBigIndex(i: any) {
    this.indexBig = i
  }

  selectedType1: string = ""
  selectedIndex1: number = -1
  selectedType2: string = ""
  selectedIndex2: number = -1
  selectedType3: string = ""
  selectedIndex3: number = -1
  selectedType4: string = ""
  selectedIndex4: number = -1
  selectedType5: string = ""
  selectedIndex5: number = -1

  handleClickTitle1(index: number) {

    this.selectedType1 = "title1"
    this.selectedIndex1 = index
    this.selectedType2 = ""
    this.selectedIndex2 = -1
    this.selectedType3 = ""
    this.selectedIndex3 = -1
    this.selectedType4 = ""
    this.selectedIndex4 = -1
  }

  // isThisvalidTitle1(index:number){
  //   if(this.selectedType=="title1" &&
  //   this.selectedIndex==index){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  handleClickTitle2(index: number, id) {

    this.selectedType1 = ""
    this.selectedIndex1 = -1
    this.selectedType2 = "title2"
    this.selectedIndex2 = index
    this.selectedType3 = ""
    this.selectedIndex3 = -1
    this.selectedType4 = ""
    this.selectedIndex4 = -1
    this.selectedType5 = ""
    this.selectedIndex5 = -1

    if (id === "users_list") {
      this.router.navigate(["/admin/users"]);
    }
  }

  handleClickTitle3(index: number) {
    this.selectedType1 = ""
    this.selectedIndex1 = -1
    this.selectedType3 = "title3"
    this.selectedIndex3 = index
    this.selectedType4 = ""
    this.selectedIndex4 = -1
  }
  handleClickTitle4(index: number) {
    this.selectedType1 = ""
    this.selectedIndex1 = -1
    this.selectedType4 = "title4"
    this.selectedIndex4 = index
  }

  public clickSubMenu(menu: string, target: any) {
    if (menu != "15") {
      document.getElementById("15").classList.remove("show");
    }
    if (menu != "18") {
      document.getElementById("18").classList.remove("show");
    }
    console.log("aaa:::", menu)
    if (menu === "Dashboard") {
      this.router.navigate(["/dashboard"]);
    }
    let result = target.hasAttribute("id");
    console.log(menu)
    if (result) {
      $(`#${menu}`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }

  public clickMenu(menu: string, target: any) {

    let result = target.hasAttribute("name");
    // if(menu!="15"){
    //   $(`#15`).classList.remove("show");
    // }
    // if(menu!="18"){
    //   $(`#18`).classList.remove("show");
    // }
    if (result) {
      $(`#${menu}`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }

  public clicksub(menu: string, target: any) {
    let result = target.hasAttribute("subcat");
    console.log(`#${menu}-dropdown`, "a::::", menu)
    if (result) {
      $(`#${menu}-dropdown`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }
}
