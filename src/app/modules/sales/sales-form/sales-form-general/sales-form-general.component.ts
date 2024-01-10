import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Sales } from "../../models/sales";
import { SalesService } from "../../service/sales.service";

@Component({
  selector: "app-sales-form-general",
  templateUrl: "./sales-form-general.component.html",
  styleUrls: ["./sales-form-general.component.scss"],
})
export class SalesFormGeneralComponent implements OnInit {
  @Input() sales!: Sales;
  salesReplica!: Sales;
  addform: FormGroup;
  fieldControl: FormControl;
  constructor(
    private sharedService: SharedService,
    private salesService: SalesService,
  ) {}

  names: Array<String> = [];
  codes: Array<String> = [];
  ngOnInit(): void {
    this.initForm();
    this.salesService.findAll().subscribe((data) => {
      this.names = data.map((el) => {
        return el.name;
      });
      this.codes = data.map((el) => {
        return el.code;
      });
    });
    if (this.sales.id != null) {
      this.sharedService.setIsActive(true);
    }
  }
  id = "";
  getstatus() {
    if (this.sales.id) {
      this.static = "update";
      if (this.id != this.sales.id) {
        this.id = this.sales.id;
        this.salesReplica = JSON.parse(JSON.stringify(this.sales));
      }

      return "update";
    } else if (!this.sales.id) {
      this.static = "create";
      this.geValues("z");
      return "create";
    }
  }
  initForm() {
    this.fieldControl = new FormControl("", [
      Validators.required,

      Validators.pattern(/^[a-zA-Z]+$/),
    ]);
    this.addform = new FormGroup({
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      Payment_Term: new FormControl("", []),
      type: new FormControl("", []),
    });
  }
  geValues(event) {
    if (
      !this.codeIsvalid &&
      this.sales.type &&
      this.sales.code != null &&
      this.sales.code != "" &&
      this.sales.name != null &&
      this.existcodeIsvalid == false &&
      this.dispotruename == false &&
      this.sales.name != ""
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;

  isBlurDCisvalid() {
    if (this.sales.code == undefined) {
      this.DCisvalid = true;
    } else if (this.sales.code.toString().length < 1) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {
    if (this.sales.name == undefined) {
      this.DNisvalid = true;
    } else if (this.sales.name.toString().length < 1) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlCode: string): boolean {
    const control = this.addform.controls[controlCode];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlSpeciesType: string): boolean {
    const control = this.addform.controls[controlSpeciesType];
    return control.invalid && (control.dirty || control.touched);
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
    if (this.names.indexOf(this.sales.name) != -1) {
      if (this.static == "update") {
        if (this.sales.name == this.salesReplica.name) {
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
  static = "";
  existcodeIsvalid = false;
  existcode() {
    if (this.codes.indexOf(this.sales.code + "") != -1) {
      if (this.static == "update") {
        if (this.sales.code == this.salesReplica.code) {
          this.existcodeIsvalid = false;
        } else {
          this.existcodeIsvalid = true;
        }
      } else {
        this.existcodeIsvalid = true;
      }
    } else {
      this.existcodeIsvalid = false;
    }
  }

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;

    if (codeRegex.test(this.sales.code)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }
}
