import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { SvgTransitionService } from "../svgTransition/svg-transition.service";

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
          {
            label: "menu.farms",
            path: "/farms",
            title: "menu.farms",
            icon: "agriculture",
            class: "",
          },
        ],
      },
    ],
  },
  {
    label: "extra",
    cateeg: "Business",
    icon: "corporate_fare",
    id: "18",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private svgTransitionService: SvgTransitionService,
  ) {}

  role:String []= JSON.parse( localStorage.getItem("tocken")).roles  ;

  allowForOnlyAdmin():boolean{
    if(JSON.parse( localStorage.getItem("tocken")).roles.includes("ROLE_ADMIN") ){
      return true
    }
    return false
  }

  anyLoggedinUser(){
    if(JSON.parse( localStorage.getItem("tocken")).roles.length>0 ){
      return true
    }
    return false
  }

  selectItem(item: string) {
    // Navigate to the selected item when it's clicked
    this.router.navigate([`/${item}`]);
  }

  get isTransitioned() {
    return this.svgTransitionService.getIsTransitioned();
  }

  toggleTransition() {
    this.svgTransitionService.toggleTransition();
  }

  isAdmin: boolean = true;

  ngOnInit() {
    // if(JSON.parse(localStorage.getItem("tocken")).roles[0]=="ROLE_ADMIN" ){
    //   this.isAdmin=true
    // }
  }
}
