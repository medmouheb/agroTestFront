import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { SalesSKU } from "app/modules/sales-sku/models/salesSku";
import { SalesSkuService } from "app/modules/sales-sku/services/sales-sku.service";
import { SalesService } from "app/modules/sales/service/sales.service";

@Component({
  selector: "app-sales-sku-form-general",
  templateUrl: "./sales-sku-form-general.component.html",
  styleUrls: ["./sales-sku-form-general.component.scss"],
})
export class SalesSkuFormGeneralComponent implements OnInit {
  @Input() salessku!: SalesSKU;
  addform: FormGroup;
  saless: any;
  fieldControl: FormControl;
  constructor(
    private sharedService: SharedService,
    private salesservice: SalesService,
    private salesSkuService: SalesSkuService,
  ) {}
  names: Array<String> = [];
  codes: Array<String> = [];

  ngOnInit(): void {
    if (this.salessku == undefined)
      this.salessku = { sailorNameSku: "", sailorCode: "" };
    this.initForm();
    this.getallsales();
    this.salesSkuService.findAll().subscribe((data) => {
      this.names = data.map((el) => {
        return el.sailorNameSku;
      });
      this.codes = data.map((el) => {
        return el.sailorCodeSku;
      });
    });
  }
  dvendor: boolean = false;
  isBlur5() {
    if (
      this.salessku.sailorCode == "" ||
      this.salessku.sailorCode == undefined
    ) {
      this.dvendor = true;
    } else {
      this.dvendor = false;
    }
  }
  getallsales() {
    this.salesservice.findAll().subscribe({
      next: (result) => {
        this.saless = result;
      },
      error: (error) => console.error(error),
    });
  }
  initForm() {
    this.fieldControl = new FormControl("", [
      Validators.required,

      Validators.pattern(/^[ a-zA-Z ]*$/),
    ]);
    this.addform = new FormGroup({
      sailorCodeSku: new FormControl(null, [Validators.required]),
      sailorNameSku: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[ a-zA-Z ]*$/),
      ]),
      sailorCode: new FormControl(null, [Validators.required]),
    });
  }
  geValues(event) {
    if (
      this.salessku.sailorCode != null &&
      this.salessku.sailorCode != "" &&
      this.salessku.sailorNameSku != null &&
      this.salessku.sailorNameSku != "" &&
      this.salessku.sailorCode.toString().length >= 1 &&
      this.fieldControl.status != "INVALID" &&
      this.salessku.sailorNameSku.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  minIstrueCode: boolean = false;
  isBlur() {
    if (this.salessku.sailorCode == undefined) {
      this.minIstrueCode = true;
    } else if (
      this.salessku.sailorCode.toString().length == 0 &&
      this.salessku.sailorCode == ""
    ) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  isBlur3() {
    if (this.fieldControl.value == "" || this.fieldControl.value == undefined) {
      this.minIstrueName2 = false;
    }
  }
  minIstrueName2: boolean = false;
  isBlur2() {
    if (this.fieldControl.status == "INVALID") {
      this.minIstrueName2 = true;
    } else if (this.fieldControl.status == "VALID") {
      this.minIstrueName2 = false;
    }
  }
  get f() {
    return this.addform.controls;
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
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.salessku.sailorCodeSku == undefined) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }
  isBlurDNisvalid() {
    if (this.salessku.sailorNameSku == undefined) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  generateRandomCode() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  newSeggestions = "";
  dispotruename = false;

  existname() {
    if (this.names.indexOf(this.salessku.sailorNameSku) != -1) {
      this.dispotruename = true;
      this.newSeggestions =
        "chose " +
        this.salessku.sailorNameSku +
        this.generateRandomCode() +
        " or " +
        this.salessku.sailorNameSku +
        this.generateRandomCode() +
        " or " +
        this.salessku.sailorNameSku +
        this.generateRandomCode() +
        " or " +
        this.salessku.sailorNameSku +
        this.generateRandomCode();
    } else {
      this.dispotruename = false;
    }
  }
  existcodeIsvalid = false;
  existcode() {
    if (this.codes.indexOf(this.salessku.sailorCodeSku + "") != -1) {
      this.existcodeIsvalid = true;
    } else {
      this.existcodeIsvalid = false;
    }
  }
}
