import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CostCenter } from "app/modules/cost-center/model/cost-center";
import { CostCenterService } from "app/modules/cost-center/services/cost-center.service";
import { Fournisseur } from "app/modules/fournisseurs/models/fournisseur.model";
import { FournisseursService } from "app/modules/fournisseurs/services/fournisseurs.service";
import { WarehouseService } from "app/modules/warehouse/services/warehouse.service";
import { Warehouse } from "../../../models/warehouse.model";
@Component({
  selector: "app-warehouse-form-general",
  templateUrl: "./warehouse-form-general.component.html",
  styleUrls: ["./warehouse-form-general.component.scss"],
})
export class WarehouseFormGeneralComponent implements OnInit {
  @Input() warehouse: Warehouse = {};
  warehouseReplica: Warehouse = {};

  costcenters: Array<CostCenter> = [];
  fournisseurs: Array<Fournisseur> = [];
  fieldControl: FormControl;
  names: Array<String> = [];
  codes: Array<String> = [];

  costCenterTypes = ["ADMIN", "INTERNAL", "EXTERNAL"];

  types = ["OWNED", "THIRD PARTY"];

  vendors = ["Vendor 1", "Vendor 2", "Vendor 3"];
  static = ""

  myForm!: FormGroup;
  addForm!: FormGroup;

  // initialisation du formulaire
  constructor(private fb: FormBuilder, private sharedService: SharedService,
    private costcenterservice: CostCenterService,
    private fournisseurservice: FournisseursService, private warehouseService: WarehouseService) { }
  ngOnInit(): void {
    this.initForm();
    this.getAllcostcenter();
    this.getallfourniss();
    this.warehouseService.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })
    this.geValues("")


  }
  id=""
  fetstatic(){
    this.geValues("")
    if (this.warehouse.id) {
      this.static = "update"
      if (this.id != this.warehouse.id) {
        this.warehouseReplica =  JSON.parse( JSON.stringify(  this.warehouse))
        this.id = this.warehouse.id

      }

    } else if (!this.warehouse.id) {
      this.static = "create"
    }
  }

  // generateRandomCode() {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let code = '';
  //   for (let i = 0; i < 4; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     code += characters.charAt(randomIndex);
  //   }
  //   return code;
  // }

  newSeggestions = ""
  dispotruename = false

  existname() {

    if (this.names.indexOf((this.warehouse.name + "")) != -1) {
      if(this.static=="update" ){
        if(this.warehouse.name == this.warehouseReplica.name){
          this.dispotruename = false
        }else{
          this.dispotruename = true
        }
      }else{
        this.dispotruename = true
      }
    } else {
      this.dispotruename = false
    }
  }
  existcodeIsvalid = false
  existcode() {
    if (this.codes.indexOf((this.warehouse.code + "")) != -1) {
      if(this.static=="update" ){
        if(this.warehouse.code == this.warehouseReplica.code){
          this.existcodeIsvalid = false
        }else{
          this.existcodeIsvalid = true
        }
      }else{
        this.existcodeIsvalid = true
      }

    } else {
      this.existcodeIsvalid = false
    }


  }

  getallfourniss() {
    this.fournisseurservice.findAll().subscribe({
      next: (result) => { this.fournisseurs = result; },
      error: (error) => console.error(error),
    });
  }
  getAllcostcenter() {
    this.costcenterservice.findAll().subscribe({
      next: (result) => { this.costcenters = result; },
      error: (error) => console.error(error),
    });
  }

  selectVAlue(e: any) {
    let t = this.costcenters.filter(el => { return el.code == e.target.value })[0].name
    this.myForm.value.costCenterName = t
    this.warehouse.costCenterName = t
    this.myForm.value['costCenterName'] = t

  }
  selectVAlue2(e: any) {
    let t = this.fournisseurs.filter(el => { return el.code == e.target.value })[0]
    this.warehouse.vendorname = t.name
    this.addForm.value['vendorname'] = t.name
    this.warehouse.vendor = t.name
    this.warehouse.vendorname = t.name

  }


  initForm() {


    this.myForm = new FormGroup({
      code: new FormControl("", [
        Validators.required,

      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.email,
      ]),
      name: new FormControl("", [
        Validators.required,

      ]),

    });
    this.addForm = this.fb.group({
      code: ["", Validators.required],//5
      vendorname: ["", Validators.required],//5
      name: ["", Validators.required],//3
      type: ["", Validators.required],
      vendor: ["", Validators.required],
      costCenterCode: ["", Validators.required],
      costCenterName: ["", Validators.required],
      costCenterType: ["", Validators.required],
      divisionName: ["", Validators.required],
      divisionCode: ["", Validators.required],
      startingDate: ["", Validators.required],
      isPrimary: ["", Validators.required],
      status: ["", Validators.required],
      email: ["", Validators.required],
    });

  }

  geValues(event) {

    if (
      !this.existcodeIsvalid && !this.dispotruename &&
      this.warehouse.code != null &&
      this.warehouse.code != "" &&
      this.warehouse.name != null &&
      this.warehouse.name != "" &&
      this.warehouse.type != null &&
      this.warehouse.type != "" &&
      this.warehouse.vendor != null &&
      this.warehouse.vendor != "" &&
      this.warehouse.code.toString().length >= 1 &&
      this.warehouse.name.toString().length >= 1 &&
      this.warehouse.costCenterCode.toString().length >= 1 &&
      this.warehouse.costCenterName.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }

  }
  divisinv: boolean = false
  isBlur4() {
    if ((this.myForm.value.costCenterCode == "") || (this.warehouse.costCenterCode == undefined)) {
      this.divisinv = true
    } else {
      this.divisinv = false

    }
  }
  dvendor: boolean = false
  isBlur5() {
    if ((this.myForm.value.vendor == "") || (this.warehouse.vendor == undefined)) {
      this.dvendor = true
    } else {
      this.dvendor = false

    }
  }
  PrimaryisValid: boolean = true
  isPrimaryValid() {
    if (this.addForm.value.isPrimary == "false" || this.addForm.value.isPrimary == "true") {
      this.PrimaryisValid = false
    }
  }


  typeisValid: boolean = true

  istypeValid(event) {

    if (this.addForm.value.costCenterType) {
      this.typeisValid = false
    }
    this.geValues(event)
  }


  isControlValid(controlName: string): boolean {
    const control = this.myForm.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.myForm.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  onTypeChange() {
    if (this.warehouse.type !== "THIRD PARTY") {
      this.warehouse.vendor = null;
    }
  }

  codeIsvalid = false

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.warehouse.code)) {
      this.codeIsvalid = false;

    }
    else {
      this.codeIsvalid = true
    }

  }

  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  minIstrueName2: boolean = false


  isBlurDCisvalid() {
    if (this.warehouse.code == undefined) {
      this.DCisvalid = true

    } else if (this.warehouse.code.toString().length < 1) {
      this.DCisvalid = true
    } else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.warehouse.name == undefined) {
      this.DNisvalid = true
    } else
      if (this.warehouse.name.toString().length < 1) {
        this.DNisvalid = true
      } else {
        this.DNisvalid = false
      }
  }


  CCCisvalid: boolean = false;
  CCNisvalid: boolean = false;
  isBlurCCCisvalid() {
    this.CCCisvalid1 = true
    this.CCCisvalid2 = true

    if (this.warehouse.costCenterCode.toString().length < 5) { this.CCCisvalid = true }
    else {
      this.CCCisvalid = false
    }
  }

  isBlurCCNisvalid() {
    this.CCNisvalid1 = true
    this.CCNisvalid2 = true
    if (this.warehouse.costCenterName.toString().length < 3) { this.CCNisvalid = true }
    else {
      this.CCNisvalid = false
    }
  }

  maiLisvalid: boolean = false;
  isMaiLisvalid() {
    this.maiLisvalid1 = true

    if (this.warehouse.email.toString().length < 3 || !this.warehouse.email.toString().includes("@") || !this.warehouse.email.toString().includes(".")) { this.maiLisvalid = true }
    else {
      this.maiLisvalid = false
    }
  }
  CCCisvalid1: boolean = false
  CCNisvalid1: boolean = false
  DNisvalid1: boolean = false
  DCisvalid1: boolean = false
  isprimaryvalidation() {
    return (this.CCCisvalid1 && this.CCNisvalid1 && this.DNisvalid1 && this.DCisvalid1 && this.addForm.value.isPrimary == ""
    )
  }

  CCCisvalid2: boolean = false
  CCNisvalid2: boolean = false
  DNisvalid2: boolean = false
  DCisvalid2: boolean = false
  maiLisvalid1: boolean = false
  isprimarytype() {

    return (this.CCCisvalid2 && this.CCNisvalid2 && this.DNisvalid2 && this.DCisvalid2 && (this.addForm.value.type == undefined)
    )
  }



}
