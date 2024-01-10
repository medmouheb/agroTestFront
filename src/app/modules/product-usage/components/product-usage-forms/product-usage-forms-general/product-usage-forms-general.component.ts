import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { ProductUsage } from "app/modules/product-usage/model/product-usage";
import { ProductUsageService } from "app/modules/product-usage/service/product-usage.service";

@Component({
  selector: "app-product-usage-forms-general",
  templateUrl: "./product-usage-forms-general.component.html",
  styleUrls: ["./product-usage-forms-general.component.scss"],
})
export class ProductUsageFormsGeneralComponent implements OnInit {
  @Input() camp!: ProductUsage;
  campReplica!: ProductUsage;

  @ViewChild("addform")
  addform: FormGroup;
  codeunique: any;
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private compaser: ProductUsageService,
  ) {}
  codes: Array<String> = [];

  ngOnInit(): void {
    if (this.camp != null) {
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe((data) => {
        this.codes = data.map((el) => {
          return el.numeroDeLot;
        });
      });
    }

    if (this.camp == undefined) {
      this.camp = { ndeReference: "", numeroDeLot: "" };
    }
    this.initForm();

    if (this.camp.id) {
      this.static = "update";
      this.campReplica = JSON.parse(JSON.stringify(this.camp));
    } else if (!this.camp.id) {
      this.static = "create";
    }
  }
  id = "";

  gettat() {
    if (this.camp.id) {
      if (this.camp.id != this.id || this.id == "") {
        this.id = this.camp.id;
      } else {
        this.campReplica = JSON.parse(JSON.stringify(this.camp));
      }
      this.static = "update";
    } else if (!this.camp.id) {
      this.static = "create";
    }
  }

  initForm() {
    this.addform = this.fb.group({
      numeroDeLot: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      ndeReference: ["fgegegeged", Validators.required],
    });
  }

  generateUniqueNumericCode() {
    const digits = "0123456789";
    let code = "";
    let length = 6;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits.charAt(randomIndex);
    }
    this.codeunique = code;

    this.camp.ndeReference = code;

    let a = document.getElementById("ss") as HTMLInputElement;
    a.value = code;
  }

  minIstrueCode: boolean = false;

  isBlur() {
    if (this.camp.numeroDeLot == undefined) {
      this.minIstrueCode = true;
    } else if (this.camp.numeroDeLot.toString().length < 1) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  blur1() {
    if (this.camp.numeroDeLot == null) {
      this.dispotrueCode = false;
    }
  }
  static = "";
  exist() {
    if (this.codes.indexOf(this.camp.numeroDeLot + "") != -1) {
      if (this.static == "update") {
        if (this.camp.numeroDeLot == this.campReplica.numeroDeLot) {
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

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;

    if (codeRegex.test(this.camp.numeroDeLot)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }

  exist1() {
    this.compaser.findbyName(this.camp.ndeReference).subscribe(
      (data) => {
        if (data != null) {
          this.dispotruename = true;
        } else {
          this.dispotruename = false;
        }
      },
      (error) => {
        if (error.status == 404) {
          this.dispotruename = false;
        }
      },
    );
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

  existname() {
    if (this.codes.indexOf(this.camp.ndeReference) != -1) {
      this.dispotruename = true;
    } else {
      this.dispotruename = false;
    }
  }

  minIstrueName: boolean = false;
  minIstrueName2: boolean = false;

  isBlur1() {
    if (
      this.camp.ndeReference === undefined ||
      this.camp.ndeReference.trim() === ""
    ) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }

  geValues(event) {
    if (
      this.dispotrueCode == false &&
      this.dispotruename == false &&
      this.camp.numeroDeLot != null &&
      this.camp.numeroDeLot != "" &&
      this.camp.numeroDeLot.toString().length >= 1
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

  get f() {
    return this.addform.controls;
  }
  minIphone: boolean = false;
}
