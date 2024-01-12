import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { LogisticUnit } from "app/modules/logistic-unit/models/logistic-unit";
import { LogisticUnitService } from "app/modules/logistic-unit/services/logistic-unit.service";

@Component({
  selector: "app-logistic-unit-forms-general",
  templateUrl: "./logistic-unit-forms-general.component.html",
  styleUrls: ["./logistic-unit-forms-general.component.scss"],
})
export class LogisticUnitFormsGeneralComponent implements OnInit {
  @Input() camp!: LogisticUnit;
  campReplica!: LogisticUnit;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private compaser: LogisticUnitService,
  ) {}
  codes: Array<String> = [];
  names: Array<String> = [];
  id = "";
  getstatus() {
    if (this.camp.id) {
      this.static = "update";
      if (this.id != this.camp.id) {
        this.id = this.camp.id;
        this.campReplica = JSON.parse(JSON.stringify(this.camp));
      }

      return "update";
    } else if (!this.camp.id) {
      this.static = "create";
      this.geValues("z");
      return "create";
    }
  }
  ngOnInit(): void {
    if (this.camp != null) {
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe((data) => {
        this.codes = data.map((el) => {
          return el.logisticCode;
        });
        this.names = data.map((el) => {
          return el.logisticName;
        });
      });
    }

    if (this.camp == undefined) {
      this.camp = { logisticName: "", logisticCode: "" };
    }
    this.initForm();
  }

  initForm() {
    this.addform = this.fb.group({
      logisticCode: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      logisticName: [null, Validators.required],
    });
  }

  minIstrueCode: boolean = false;

  isBlur() {
    if (this.camp.logisticCode == undefined || this.camp.logisticCode == null) {
      this.minIstrueCode = true;
    } else if (this.camp.logisticCode.toString().length < 1) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  static = "";
  exist() {
    if (this.codes.indexOf(this.camp.logisticCode + "") != -1) {
      if (this.static == "update") {
        if (this.camp.logisticCode == this.campReplica.logisticCode) {
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
    if (codeRegex.test(this.camp.logisticCode)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
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

  existname() {
    if (this.names.indexOf(this.camp.logisticName) != -1) {
      if (this.static == "update") {
        if (this.camp.logisticName == this.campReplica.logisticName) {
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

  minIstrueName: boolean = false;
  minIstrueName2: boolean = false;

  isBlur1() {
    console.log(this.camp.logisticName);
    if (
      this.camp.logisticName === undefined ||
      this.camp.logisticName.trim() === ""
    ) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }

  geValues(event) {
    console.log(
      "kkk::",
      !this.dispotrueCode,
      !this.dispotruename && !this.codeIsvalid,
      !this.minIstrueCode,
      !this.minIstrueName,
      !this.dispotruename,
    );

    if (
      !this.dispotrueCode &&
      !this.dispotruename &&
      !this.codeIsvalid &&
      !this.minIstrueCode &&
      !this.minIstrueName &&
      this.camp.logisticCode != null &&
      this.camp.logisticCode != "" &&
      this.camp.logisticName != null &&
      this.camp.logisticName != "" &&
      this.camp.logisticCode.toString().length >= 1 &&
      this.camp.logisticName.toString().length >= 1
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
