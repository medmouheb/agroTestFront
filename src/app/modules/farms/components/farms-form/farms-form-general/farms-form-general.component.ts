import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CostCenter } from "app/modules/cost-center/model/cost-center";
import { CostCenterService } from "app/modules/cost-center/services/cost-center.service";
import { Fournisseur } from "app/modules/fournisseurs/models/fournisseur.model";
import { FournisseursService } from "app/modules/fournisseurs/services/fournisseurs.service";
import { Growout } from "app/modules/growout/models/growout";
import { GrowoutService } from "app/modules/growout/services/growout.service";
import { Warehouse } from "app/modules/warehouse/models/warehouse.model";
import { WarehouseService } from "app/modules/warehouse/services/warehouse.service";
import { Farm } from "../../../models/farm";
import { FarmsService } from "app/modules/farms/services/farms.service";
import { environment } from "environments/environment";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-farms-form-general",
  templateUrl: "./farms-form-general.component.html",
  styleUrls: ["./farms-form-general.component.scss"],
})
export class FarmsFormGeneralComponent implements OnInit {
  @Input() farm!: Farm;
  farmReplica!: Farm;

  growouts: Array<Growout> = [];
  costcenters: Array<CostCenter> = [];
  warehouses: Warehouse[] = [];
  vendors: Fournisseur[] = [];
  addform: FormGroup;
  fieldControl: FormControl;
  names: Array<String> = [];
  codes: Array<String> = [];
  constructor(
    private farmsService: FarmsService,
    private warehouseService: WarehouseService,
    private fournisseurService: FournisseursService,
    private sharedService: SharedService,
    private growoutservice: GrowoutService,
    private costcenterservice: CostCenterService,
    private toastService: HotToastService,
  ) {}
  getAllgrowout() {
    this.growoutservice.findAll().subscribe({
      next: (result) => (this.growouts = result),
      error: (error) => console.error(error),
    });
  }
  getallcostCenter() {
    this.costcenterservice.findAll().subscribe({
      next: (res) => (this.costcenters = res),
      error: (error) => console.error(error),
    });
  }
  selectValue(e: any) {
    let wil = this.growouts.filter((el) => {
      return el.code == e.target.value;
    })[0];

    this.farm.growout = wil;
    this.farm.growoutcode = wil.code;
  }
  uploadText1 = "upload";
  uploadText2 = "upload";

  selectValuecostCenter(e: any) {
    let wil = this.costcenters.filter((el) => {
      return el.code == e.target.value;
    })[0];

    this.farm.cost_Center = wil;
  }

  setActif() {
    this.farm.status = !this.farm.status;
  }
  static = "";

  ngOnInit(): void {
    if (this.farm == undefined) {
      this.farm = { nom: "", code: "", status: true };
    }

    this.getallcostCenter();
    this.getAllgrowout();
    this.initForm();
    if (!this.farm.warehouse) {
      this.farm.warehouse = {};
    }
    if (!this.farm.vendor) {
      this.farm.vendor = {};
    }

    this.getAllWarehouses();
    this.getAllVendors();

    this.farmsService.findAll().subscribe((data) => {
      this.names = data.map((el) => {
        return el.nom;
      });
      this.codes = data.map((el) => {
        return el.code;
      });
    });
  }
  id = "";
  getstatus() {
    if (this.farm.id) {
      this.static = "update";
      if (this.id != this.farm.id) {
        this.id = this.farm.id;
        this.farmReplica = JSON.parse(JSON.stringify(this.farm));
      }
      this.sharedService.setIsActive(true);
      return "update";
    } else if (!this.farm.id) {
      this.static = "create";
      this.geValues("");
      return "create";
    }
  }

  dispotruename = false;

  existname() {
    if (this.names.indexOf(this.farm.nom + "") != -1) {
      if (this.static == "update") {
        if (this.farm.nom == this.farmReplica.nom) {
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

  dispotruecode = false;

  existcode() {
    if (this.codes.indexOf(this.farm.code + "") != -1) {
      if (this.static == "update") {
        if (this.farm.code == this.farmReplica.code) {
          this.dispotruecode = false;
        } else {
          this.dispotruecode = true;
        }
      } else {
        this.dispotruecode = true;
      }
    } else {
      this.dispotruecode = false;
    }
  }

  getFile(id: any) {
    window.open(`${environment.apiUrl}/files/download/${id}`, "_blank");
  }

  initForm() {
    this.fieldControl = new FormControl("", [
      Validators.required,

      Validators.pattern(/^[a-zA-Z ]*$/),
    ]);
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),

      stage: new FormControl(""),
      status: new FormControl(""),
      grouwout: new FormControl(""),
      type: new FormControl(""),
      cost_Center: new FormControl(""),
      ferme_Type: new FormControl(""),
      status_Construction: new FormControl(""),
      num_Client: new FormControl(""),
      manager_Code: new FormControl(""),
      manager_name: new FormControl(""),
      technician_Code: new FormControl(""),
      technician_Name: new FormControl(""),
      area_type: new FormControl(""),
      owner_Name: new FormControl(""),
      attachments: new FormControl(""),
      address1: new FormControl(""),
      address2: new FormControl(""),
      customerCode: new FormControl(""),
      customerName: new FormControl(""),
      city_Code: new FormControl(""),
      city_Name: new FormControl(""),
      governorateCode: new FormControl(""),
      governorateName: new FormControl(""),
      zip_Code: new FormControl(""),
      email: new FormControl(""),
      deleted: new FormControl(""),
      phoneNumber: new FormControl(""),
      faxNumber: new FormControl(""),
      farm_Area: new FormControl(""),
      latitude: new FormControl(""),
      longitude: new FormControl(""),
    });
  }

  geValues(event) {
    if (
      !this.dispotruecode &&
      !this.dispotruename &&
      this.farm.code != null &&
      this.farm.code != "" &&
      this.farm.nom != null &&
      this.farm.nom != "" &&
      this.farm.owner_Name != null &&
      this.farm.owner_Name != "" &&
      this.farm.manager_Code != null &&
      this.farm.manager_Code != "" &&
      this.farm.manager_name != null &&
      this.farm.manager_name != "" &&
      this.farm.technician_Code != null &&
      this.farm.technician_Code != "" &&
      this.farm.technician_Name != null &&
      this.farm.technician_Name != "" &&
      this.farm.code.toString().length >= 1 &&
      this.farm.nom.toString().length >= 1 &&
      this.farm.owner_Name.toString().length >= 1 &&
      this.farm.manager_Code.toString().length >= 1 &&
      this.farm.manager_name.toString().length >= 1 &&
      this.farm.technician_Code.toString().length >= 1 &&
      this.farm.technician_Name.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  onWarehouseChange(e: any) {
    this.farm.warehouse = this.warehouses.filter((el) => {
      return el.id == e.target.value;
    })[0];
  }

  getAllWarehouses() {
    this.warehouseService.findAll().subscribe({
      next: (result) => {
        this.warehouses = result;
      },
      error: (error) => console.error(error),
    });
  }

  onVendorChange(e: any) {
    this.farm.vendor = this.vendors.filter((el) => {
      return el.id == e.target.value;
    })[0];
  }

  getAllVendors() {
    this.fournisseurService.findAll().subscribe({
      next: (result) => (this.vendors = result),
      error: (error) => console.error(error),
    });
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  DCisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  valid: boolean = false;
  valid3: boolean = false;
  valid4: boolean = false;
  valid5: boolean = false;
  minIstrueName: boolean = false;
  isBlur2() {
    if (this.fieldControl.status == "INVALID") {
      this.minIstrueName = true;
    } else if (this.fieldControl.status == "VALID") {
      this.minIstrueName = false;
    }
  }
  isBlur4() {
    if (this.fieldControl.value == "" || this.fieldControl.value == undefined) {
      this.minIstrueName = false;
    }
  }
  isBlurDCisvalid() {
    if (this.farm.code.toString().length < 5) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  nameISvalid: boolean = false;
  nameBlur() {
    if (this.addform.value.name.toString().length < 1) {
      this.nameISvalid = true;
    } else {
      this.nameISvalid = false;
    }
  }

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.farm.code)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }

  codeISvalid: boolean = false;
  codeBlur() {
    if (this.addform.value.code.toString().length < 1) {
      this.codeISvalid = true;
    } else {
      this.codeISvalid = false;
    }
  }

  owner_NameISvalid: boolean = false;
  owner_NameBlur() {
    if (this.addform.value.owner_Name.toString().length < 1) {
      this.owner_NameISvalid = true;
    } else {
      this.owner_NameISvalid = false;
    }
  }

  manager_CodeISvalid: boolean = false;
  manager_CodeBlur() {
    if (this.addform.value.manager_Code.toString().length < 1) {
      this.manager_CodeISvalid = true;
    } else {
      this.manager_CodeISvalid = false;
    }
  }

  manager_nameISvalid: boolean = false;
  manager_nameBlur() {
    if (this.addform.value.manager_name.toString().length < 1) {
      this.manager_nameISvalid = true;
    } else {
      this.manager_nameISvalid = false;
    }
  }

  technician_CodeISvalid: boolean = false;
  technician_CodeBlur() {
    if (this.addform.value.technician_Code.toString().length < 3) {
      this.technician_CodeISvalid = true;
    } else {
      this.technician_CodeISvalid = false;
    }
  }

  technician_NameISvalid: boolean = false;
  technician_NameBlur() {
    if (this.addform.value.technician_Name.toString().length < 3) {
      this.technician_NameISvalid = true;
    } else {
      this.technician_NameISvalid = false;
    }
  }

  isBlurSTisvali() {
    if (this.farm.owner_Name.toString().length < 3) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
    }
  }

  isBlurMisvalid() {
    if (this.farm.manager_Code.toString().length < 3) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }

  isBlurvalid() {
    if (this.farm.manager_name.toString().length < 3) {
      this.valid4 = true;
    } else {
      this.valid4 = false;
    }
  }

  isBlurval() {
    if (this.farm.manager_Code.toString().length < 3) {
      this.valid3 = true;
    } else {
      this.valid3 = false;
    }
  }

  isBlurvalidat() {
    if (this.farm.technician_Code.toString().length < 3) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }

  isBlurva() {
    if (this.farm.technician_Name.toString().length < 3) {
      this.valid5 = true;
    } else {
      this.valid5 = false;
    }
  }
  handleAttachments(e: any) {
    let dataFile = new FormData();
    this.uploadText2 = e.target.files[0].name;

    dataFile.append("file", e.target.files[0]);
    this.farmsService.handleFileUpload(dataFile).subscribe(
      (data) => {
        this.farm.attachments = data;
      },
      (err) => {
        this.farm.attachments = err.error.text;
      },
    );
  }

  handleComments(e: any) {
    let dataFile = new FormData();
    if (
      e.target.files[0].type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      this.uploadText1 = e.target.files[0].name;
      dataFile.append("file", e.target.files[0]);
      this.farmsService.handleFileUpload(dataFile).subscribe(
        (data) => {
          this.farm.comments = data;
        },
        (err) => {
          this.farm.comments = err.error.text;
        },
      );
    } else {
      this.toastService.error("accest only file.doc");
    }
  }
}
