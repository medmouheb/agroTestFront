import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { FreightTermsService } from "app/modules/freight-terms/Service/freight-terms.service";
import { FreightTerms } from "app/modules/freight-terms/models/freightterms";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";

@Component({
  selector: "app-freightterms-form-general",
  templateUrl: "./freightterms-form-general.component.html",
  styleUrls: ["./freightterms-form-general.component.scss"],
})
export class FreighttermsFormGeneralComponent implements OnInit {
  @Input() freightterm!: FreightTerms;
  freighttermReplica!: FreightTerms;

  addform: FormGroup;
  constructor(
    private sharedService: SharedService,
    private freighttermsservice: FreightTermsService,
    private dialogComponent: DialogComponent,
  ) {}

  freighttermcodeList = ["CIF", "CFR", "FOB", "FoB", "DAT", "CIP"];
  codes: Array<String> = [];
  names: Array<String> = [];
  ngOnInit(): void {
    if (this.freightterm == undefined)
      this.freightterm = { freighttermcode: "", freighttermname: "" };
    this.initForm();
    if (
      this.freighttermcodeList.indexOf(this.freightterm.freighttermcode) != -1
    ) {
      this.otherCondition = true;
    }
    if (!this.freightterm.freighttermcode) {
      this.sharedService.setIsActive(false);
    }
    this.freighttermsservice.findAll().subscribe((data) => {
      this.codes = data.map((el) => {
        return el.freighttermcode;
      });
      this.names = data.map((el) => {
        return el.freighttermname;
      });
    });
  }
  static = "";
  id = "";
  getstatus() {
    if (this.freightterm.id) {
      this.static = "update";
      if (this.id != this.freightterm.id) {
        this.id = this.freightterm.id;
        this.freighttermReplica = JSON.parse(JSON.stringify(this.freightterm));
      }
      return "update";
    } else if (!this.freightterm.id) {
      this.static = "create";
      return "create";
    }
  }

  initForm() {
    this.addform = new FormGroup({
      freighttermcode: new FormControl(null, [Validators.required]),
      freighttermname: new FormControl(null, [Validators.required]),
      notes: new FormControl(null),
      active: new FormControl(null),
    });
  }
  getetat() {
    if (
      this.addform.status == "INVALID" ||
      this.freightterm.freighttermcode == undefined ||
      this.freightterm.freighttermname == undefined
    ) {
      this.sharedService.setIsActive(false);
    }
  }
  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  blur1() {
    if (this.freightterm.freighttermcode == null) {
      this.dispotrueCode = false;
    }
  }
  exist() {
    if (this.codes.indexOf(this.freightterm.freighttermcode + "") != -1) {
      if (this.static == "update") {
        if (
          this.freighttermReplica.freighttermcode ==
          this.freightterm.freighttermcode
        ) {
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
  newSeggestions = "";

  existname() {
    if (this.names.indexOf(this.freightterm.freighttermname) != -1) {
      if (this.static == "update") {
        if (
          this.freightterm.freighttermname ==
          this.freighttermReplica.freighttermname
        ) {
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
  geValues(event) {
    console.log(
      "this.freightterms.code.length",
      this.freightterm.freighttermcode.toString().length >= 5,
    );
    console.log(
      this.freightterm.freighttermcode != null &&
        this.freightterm.freighttermcode != "" &&
        this.freightterm.freighttermname != null &&
        this.freightterm.freighttermname != "" &&
        this.freightterm.freighttermcode.toString().length >= 1 &&
        this.freightterm.freighttermname.toString().length >= 1,
    );
    if (
      this.dispotrueCode == false &&
      this.dispotruename == false &&
      this.freightterm.freighttermcode != null &&
      this.freightterm.freighttermcode != "" &&
      this.freightterm.freighttermname != null &&
      this.freightterm.freighttermname != "" &&
      this.freightterm.freighttermcode.toString().length >= 1 &&
      this.freightterm.freighttermname.toString().length >= 1
    ) {
      this.dialogComponent.setsubmitstatus(true);
    } else {
      this.dialogComponent.setsubmitstatus(false);
    }
  }

  get f() {
    return this.addform.controls;
  }
  otherCondition = false;
  setList() {
    let ch = this.freightterm.freighttermcode;
    switch (ch) {
      case "CIF":
        this.freightterm.freighttermname = "Cost,Insurance,Freight";
        this.otherCondition = false;

        break;
      case "CFR":
        this.freightterm.freighttermname = "Cost and Freight";
        this.otherCondition = false;

        break;
      case "FOB":
        this.freightterm.freighttermname = "Free On Board";
        this.otherCondition = false;

        break;
      case "FoB":
        this.freightterm.freighttermname = "Freight On Board";
        this.otherCondition = false;

        break;
      case "DAT":
        this.freightterm.freighttermname = "Delivered at Terminal";
        this.otherCondition = false;

        break;
      case "CIP":
        this.freightterm.freighttermname = "Carrier Insurance Paid";
        this.otherCondition = false;

        break;
      default:
        this.otherCondition = true;
        this.freightterm.freighttermname = "";
        this.freightterm.freighttermcode = "";
        break;
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
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.freightterm.freighttermcode == undefined) {
      this.DCisvalid = true;
    } else if (this.freightterm.freighttermcode.toString().length < 1) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {
    if (this.freightterm.freighttermname == undefined) {
      this.DNisvalid = true;
    }
    if (this.freightterm.freighttermname.toString().length < 1) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }
  minIstrueName2: boolean = false;
}
