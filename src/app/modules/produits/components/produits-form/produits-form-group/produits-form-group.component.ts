import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Fournisseur } from "app/modules/fournisseurs/models/fournisseur.model";
import { FournisseursService } from "app/modules/fournisseurs/services/fournisseurs.service";
import { Produit } from "../../../models/produit.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { ProduitsService } from "app/modules/produits/services/produits.service";

@Component({
  selector: "app-produits-form-group",
  templateUrl: "./produits-form-group.component.html",
  styleUrls: ["./produits-form-group.component.scss"],
})
export class ProduitsFormGroupComponent implements OnInit {
  @ViewChild("addform")
  addform: FormGroup;
  @Input() produit: Produit = {};
  produitReplica: Produit = {};
  vendors: Array<Fournisseur> = [];
  static = "";
  id = "";
  getstatus() {
    if (this.produit.id) {
      this.static = "update";
      if (this.id != this.produit.id) {
        this.id = this.produit.id;
        this.produitReplica = JSON.parse(JSON.stringify(this.produit));
      }
      this.geValues("");
      return "update";
    } else if (!this.produit.id) {
      this.static = "create";
      this.geValues("");
      return "create";
    }
  }

  constructor(
    private produitser: ProduitsService,
    private fournisseursService: FournisseursService,
    private sharedService: SharedService,
    private fb: FormBuilder,
  ) {}
  names: Array<String> = [];
  codes: Array<String> = [];
  ngOnInit(): void {
    this.initForm();
    if (!this.produit.fournisseur) {
      this.produit.fournisseur = {};
    }
    this.getAllVendors();
    this.produitser.findAll().subscribe((data) => {
      this.names = data.map((el) => {
        return el.name;
      });
      this.codes = data.map((el) => {
        return el.code;
      });
    });
  }
  initForm() {
    this.addform = this.fb.group({
      code: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      tauxTva: [null],
      prixUnitaireHt: [null],
      maxdepasse: [null],
      fabricant: [null],
      couleur: [null],
      inventaire: [null],
      medicamenteux: [null],
      statuss: [null],
      category: [null],
      currency: [null],
      vendor: [null],
      type: [null],
    });
  }
  getAllVendors() {
    this.fournisseursService.findAll().subscribe({
      next: (result) => (this.vendors = result),
      error: (error) => console.error(error),
    });
  }

  onVendorChange(e: any) {
    this.produit.fournisseur = this.vendors.find(
      (elem) => elem.id === e.target.value,
    );
  }
  minIstrueCode: boolean = false;
  isBlur() {
    if (this.produit.code.toString().length < 1) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  dispotruename = false;
  existname() {
    if (this.names.indexOf(this.produit.name + "") != -1) {
      if (this.static == "update") {
        if (this.produit.name == this.produitReplica.name) {
          this.dispotruename = false;
        } else {
          this.dispotruename = true;
        }
      } else {
        this.dispotruename = true;
      }
    } else {
      this.dispotruename = false;
    }
  }

  dispotrueCode = false;
  exist() {
    if (this.codes.indexOf(this.produit.code + "") != -1) {
      if (this.static == "update") {
        if (this.produit.code == this.produitReplica.code) {
          this.dispotrueCode = false;
        } else {
          this.dispotrueCode = true;
        }
      } else {
        this.dispotrueCode = true;
      }
    } else {
      this.dispotrueCode = false;
    }
  }

  minIstrueName: boolean = false;
  isBlur1() {
    if (this.produit.name.toString().length < 3) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }
  geValues(event) {
    if (
      this.produit.code != null &&
      this.produit.code != "" &&
      this.produit.name != null &&
      this.produit.name != "" &&
      this.produit.code.toString().length >= 1 &&
      this.dispotrueCode == false &&
      this.dispotruename == false &&
      this.produit.name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;

    if (codeRegex.test(this.produit.code)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }

  get f() {
    return this.addform.controls;
  }
}
