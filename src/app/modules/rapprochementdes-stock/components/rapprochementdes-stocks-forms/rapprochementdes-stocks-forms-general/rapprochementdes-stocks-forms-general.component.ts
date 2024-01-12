import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { RapprochementDesStocks } from "app/modules/rapprochementdes-stock/model/rapprochementdes-stock";
import { RapprochementdesStockService } from "app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service";

@Component({
  selector: "app-rapprochementdes-stocks-forms-general",
  templateUrl: "./rapprochementdes-stocks-forms-general.component.html",
  styleUrls: ["./rapprochementdes-stocks-forms-general.component.scss"],
})
export class RapprochementdesStocksFormsGeneralComponent implements OnInit {
  @Input() camp!: RapprochementDesStocks;
  campReplica!: RapprochementDesStocks;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private compaser: RapprochementdesStockService,
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
  codeunique: any;
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
  dispotruelot: boolean = false;

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
      ndeReference: [null, Validators.required],
    });
  }

  minIstrueCode: boolean = false;

  isBlur() {
    if (this.camp.numeroDeLot == undefined) {
      this.minIstrueCode = true;
      this.sharedService.setIsActive(false);
    } else if (this.camp.numeroDeLot.toString().length < 1) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
      this.sharedService.setIsActive(true);
    }
  }
  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  blur1() {
    if (this.camp.numeroDeLot == null) {
      this.dispotrueCode = false;
      this.sharedService.setIsActive(false);
    }
  }
  static = "";
  exist() {
    if (this.codes.indexOf(this.camp.numeroDeLot + "") != -1) {
      if (this.static == "update") {
        if (this.campReplica.numeroDeLot == this.camp.numeroDeLot) {
          this.dispotruelot = false;
        } else {
          this.dispotruelot = true;
        }
      } else {
        this.dispotruelot = true;
      }
    } else {
      this.dispotruelot = false;
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
      !this.dispotruelot &&
      this.camp.numeroDeLot != null &&
      this.camp.numeroDeLot != "" &&
      this.camp.ndeReference != null &&
      this.camp.ndeReference != "" &&
      this.camp.numeroDeLot.toString().length >= 1 &&
      this.camp.ndeReference.toString().length >= 1
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
