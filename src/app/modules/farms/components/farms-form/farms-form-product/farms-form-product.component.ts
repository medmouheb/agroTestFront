import { Component, Input, OnInit } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { SharedService } from "app/modules/company/services/shared.service";
import { Farm } from "app/modules/farms/models/farm";
import { Produit } from "app/modules/produits/models/produit.model";
import { ProduitsService } from "app/modules/produits/services/produits.service";

@Component({
  selector: "app-farms-form-product",
  templateUrl: "./farms-form-product.component.html",
  styleUrls: ["./farms-form-product.component.scss"],
})
export class FarmsFormProductComponent implements OnInit {
  @Input() farm!: Farm;
  produits: Array<Produit> = [];

  farms = {
    product: "",
    land: 0,
  };

  elements: any[] = [
    {
      product: "",
      land: 0,
    },
  ];

  constructor(
    private produitserv: ProduitsService,
    private sharedservice: SharedService,
    private translateService: TranslateService,
    private toastService: HotToastService,
  ) {}

  ngOnInit(): void {
    if (this.farm.properties == undefined) {
      this.farm.properties = this.elements;
    }
    if (this.farm.properties != null) {
      this.elements = this.farm.properties;
    }

    this.getallParoduct();
    this.setvaluer();
  }

  getallParoduct() {
    this.produitserv.findAll().subscribe({
      next: (res) => (this.produits = res),
      error: (error) => console.error(error),
    });
  }
  affic: boolean = false;
  setvaluer() {
    this.resultat = true;
    let la = 0;
    for (const element of this.elements) {
      la += element.land;

      if (la == 0) {
        this.affic = true;
      } else {
        this.affic = false;
      }
    }
  }
  setvalue() {
    this.resultat = true;
    let la = 0;
    for (const element of this.elements) {
      la += element.land;
      if (la > 100) {
        this.sharedservice.setIsActive(false);
      } else {
        this.sharedservice.setIsActive(true);
      }
    }
  }

  setvaleur(index: number) {
    console.log(index);
  }
  resultat = false;
  ch: any;
  add: boolean = false;

  ajouterElement() {
    let landIs100 = false;
    let landIs10 = false;

    let sumLand = 0;
    for (const element of this.elements) {
      sumLand += element.land;
      if (element.land >= 100 || sumLand >= 100) {
        landIs100 = true;

        break;
      } else if (sumLand == 100 || element.land == 0) {
        landIs10 = true;
        break;
      }
    }

    if (landIs100) {
      this.add = true;
    } else {
      this.add = false;
      let x = 100 - sumLand;
      this.ch = x;
      this.resultat = true;
      this.elements.push({ product: "", land: 0 });
    }
    this.farm.properties = this.elements;
  }
  getvalue() {
    this.farm.properties = this.elements;
  }

  supprimerLigne(index: number) {
    this.elements.splice(index, 1);
  }

  setProduct(e: any) {
    this.farm.land = e.target.value;
  }
}
