import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CompanyService } from "app/modules/company/services/company.service";
import { SharedService } from "app/modules/company/services/shared.service";
import { Company } from "../../../models/comany";
@Component({
  selector: "app-company-from-general",
  templateUrl: "./company-from-general.component.html",
  styleUrls: ["./company-from-general.component.scss"],
})
export class CompanyFromGeneralComponent implements OnInit {
  @Input() camp!: Company;
  campReplicat!: Company;

  @ViewChild("addform")
  addform: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private compaser: CompanyService,
  ) {}
  names: Array<String> = [];
  static = "";
  ngOnInit(): void {
    if (this.camp != null) {
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe((data) => {
        this.names = data.map((el) => {
          return el.name;
        });
      });
    }

    if (this.camp == undefined) {
      this.camp = { name: "", code: "" };
    }
    this.initForm();
    if (this.camp.id) {
      this.static = "update";
      this.campReplicat = JSON.parse(JSON.stringify(this.camp));
    } else if (!this.camp.id) {
      this.static = "create";
      this.sharedService.setIsActive(false);
    }

    this.geValues("");
  }

  initForm() {
    this.addform = this.fb.group({
      code: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      name: [null, [Validators.required]],
    });
  }

  minIstrueCode: boolean = false;

  isBlur() {
    if (this.camp.code == undefined) {
      this.minIstrueCode = true;
    } else if (this.camp.code.toString().length < 1) {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }
  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  blur1() {
    if (this.camp.code == null) {
      this.dispotrueCode = false;
    }
  }
  exist() {
    this.compaser.findbycode(this.camp.code).subscribe(
      (data) => {
        if (this.static == "update") {
          try {
            if (this.camp.code == this.campReplicat.code) {
              this.dispotrueCode = false;
            } else {
              if (data != null) {
                this.dispotrueCode = true;
              } else {
                this.dispotrueCode = false;
              }
            }
          } catch (e) {}
        } else {
          if (data != null) {
            this.dispotrueCode = true;
          } else {
            this.dispotrueCode = false;
          }
        }
      },
      (error) => {
        if (error.status == 404) {
          this.dispotrueCode = false;
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
    if (this.names.indexOf(this.camp.name) != -1) {
      if (this.static == "update") {
        if (this.camp.name == this.campReplicat.name) {
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
    if (this.camp.name == undefined) {
      this.minIstrueName = true;
    } else if (this.camp.name.toString().length < 1) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }

  geValues(event) {
    if (
      !this.codeIsvalid &&
      this.dispotrueCode == false &&
      !this.dispotruename &&
      this.camp.code != null &&
      this.camp.code != "" &&
      this.camp.name != null &&
      this.camp.name != "" &&
      this.camp.code.toString().length >= 1 &&
      this.camp.name.toString().length >= 1
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

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.camp.code)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }
}
