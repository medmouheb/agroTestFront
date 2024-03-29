import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  locale: string = "";

  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.location = location;
    this.sidebarVisible = false;
    this.locale = localStorage.getItem("locale") ?? "en";
    translate.setDefaultLang(this.locale);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.locale = lang;
    localStorage.setItem("locale", lang);
  }
  selectItem(item: string) {
    this.router.navigate([`/${item}`]);
  }
  isAdmin: boolean = false;

  ngOnInit() {
    // if(JSON.parse(localStorage.getItem("tocken")).roles[0]=="ROLE_ADMIN" ){
    //   this.isAdmin=true
    // }
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    this.getRoute();
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName("body")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (body.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (body.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        body.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      body.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(2);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return titlee;
  }

  routes: String[] = [];

  getRoute() {
    var titlee = window.location.pathname.replace("/", "");

    switch (titlee) {
      case "company":
        this.routes = ["menu.companies"];
        break;
      case "division":
        this.routes = ["menu.general-Setups", "Admin", "menu.division"];
        break;
      case "growout":
        this.routes = ["menu.general-Setups", "Admin", "menu.growout"];
        break;
      case "costCenter":
        this.routes = ["menu.general-Setups", "Admin", "menu.costCenter"];
        break;
      case "country":
        this.routes = ["menu.general-Setups", "Admin", "menu.country"];
        break;
      case "willaya":
        this.routes = ["menu.general-Setups", "Admin", "willaya"];
        break;
      case "currency":
        this.routes = ["menu.general-Setups", "Admin", "currency"];
        break;
      case "tax":
        this.routes = ["menu.general-Setups", "Admin", "menu.tax"];
        break;
      case "Delivery":
        this.routes = [
          "menu.general-Setups",
          "menu.Materialhandling",
          "menu.Freightsetup",
          "menu.DeliveryInstruction",
        ];
        break;
      case "vehicule":
        this.routes = [
          "menu.general-Setups",
          "menu.Materialhandling",
          "menu.Freightsetup",
          "menu.Vehicules",
        ];
        break;
      case "vehicleType":
        this.routes = [
          "menu.general-Setups",
          "menu.Materialhandling",
          "menu.Freightsetup",
          "menu.vehicleType",
        ];
        break;
      case "freightterms":
        this.routes = [
          "menu.general-Setups",
          "menu.Materialhandling",
          "menu.Freightsetup",
          "menu.FreightTerms",
        ];
        break;
      case "shipmethode":
        this.routes = [
          "menu.general-Setups",
          "menu.Materialhandling",
          "menu.transport",
          "menu.shipmethode",
        ];
        break;
      case "fournisseurs":
        this.routes = [
          "menu.general-Setups",
          "menu.Order-Mangment",
          "menu.vendors",
        ];
        break;
      case "airports":
        this.routes = [
          "menu.general-Setups",
          "menu.places",
          "Ports",
          "menu.airports",
        ];
        break;
      case "sales":
        this.routes = [
          "menu.general-Setups",
          "menu.Order-Mangment",
          "menu.sales",
        ];
        break;
      case "warehouses":
        this.routes = ["menu.warehouses"];
        break;
      case "logisticUnit":
        this.routes = [
          "menu.general-Setups",
          "menu.Logistic",
          "menu.logistic-Unit",
        ];
        break;
      case "Initialinventory":
        this.routes = ["menu.Business", "Agriculture", "menu.Initialinventory"];
        break;
      case "farms":
        this.routes = ["menu.farms"];
        break;
      case "Field-product":
        this.routes = ["menu.Business", "Agriculture", "menu.Fieldproduct"];
        break;
      case "ProductUsage":
        this.routes = [
          "menu.Business",
          "Agriculture",
          "menu.Warehouse",
          "menu.ProductUsage",
        ];
        break;
      case "Rapprochement-des-stocks":
        this.routes = [
          "menu.Business",
          "Agriculture",
          "menu.Warehouse",
          "menu.Rapprochement-des-stocks",
        ];
        break;
      case "drivers":
        this.routes = ["menu.general-Setups", "menu.Logistic", "menu.Drivers"];
        break;
      case "vehicles":
        this.routes = [
          "menu.general-Setups",
          "menu.Logistic",
          "menu.Driver",
          "menu.Vehicles",
        ];
        break;
    }
  }
}
