import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Division } from "app/modules/division/models/division";
import { DivisionService } from "app/modules/division/services/division.service";
import { Growout } from "app/modules/growout/models/growout";
import { GrowoutService } from "app/modules/growout/services/growout.service";

@Component({
  selector: "app-growout-form-general",
  templateUrl: "./growout-form-general.component.html",
  styleUrls: ["./growout-form-general.component.scss"],
})
export class GrowoutFormGeneralComponent implements OnInit {
  @Input() growout!: Growout;
  growoutReplica!: Growout;

  @ViewChild("myForm") myForm: NgForm;
  divisions: Array<Division> = [];
  fieldControl: FormControl;

  formData = {
    name: "",
    email: "",
    message: "",
  };

  currentStep = 1;

  addform: FormGroup;

  constructor(
    private sharedService: SharedService,
    private divisionService: DivisionService,
    private growoutserv: GrowoutService,
  ) {}

  names: Array<String> = [];
  codes: Array<String> = [];

  ngOnInit(): void {
    this.initForm();
    this.getAlldivision();
    this.growoutserv.findAll().subscribe((data) => {
      this.names = data.map((el) => {
        return el.name;
      });
      this.codes = data.map((el) => {
        return el.code;
      });
    });

    if (this.growout.id) {
      this.static = "update";
      this.growoutReplica = JSON.parse(JSON.stringify(this.growout));
    } else if (!this.growout.id) {
      this.static = "create";
    }
  }
  getAlldivision() {
    this.divisionService.findAll().subscribe({
      next: (result) => {
        this.divisions = result;
      },
      error: (error) => console.error(error),
    });
  }

  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  blur1() {
    if (this.growout.code == null) {
      this.dispotrueCode = false;
    }
  }
  static = "";

  exist() {
    if (this.codes.indexOf(this.growout.code + "") != -1) {
      if (this.static == "update") {
        if (this.growout.code == this.growoutReplica.code) {
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
  // generateRandomCode() {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let code = '';
  //   for (let i = 0; i < 4; i++) {
  //     const randomIndex = Math.floor(Math.random() * characters.length);
  //     code += characters.charAt(randomIndex);
  //   }
  //   return code;
  // }

  newSeggestions = "";

  existname() {
    if (this.names.indexOf(this.growout.name + "") != -1) {
      if (this.static == "update") {
        if (this.growout.name == this.growoutReplica.name) {
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

  selectVAlue(e: any) {
    let t = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].name;
    let a = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].address;
    let em = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].email;
    let c = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].codeCity;
    let n = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].nameCity;
    let wc = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].wilayaCode;
    let wn = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].wilayaName;
    let zc = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].zipCode;
    let pn = this.divisions.filter((el) => {
      return el.code == e.target.value;
    })[0].phone;

    this.addform.value.divisionName = t;
    this.addform.value.divisionName = a;
    this.addform.value.divisionName = em;
    this.addform.value.divisionName = c;
    this.addform.value.divisionName = n;
    this.addform.value.divisionName = wc;
    this.addform.value.divisionName = zc;
    this.addform.value.divisionName = pn;

    this.growout.divisionName = t;
    this.growout.address = a;
    this.growout.email = em;
    this.growout.codeCity = c;
    this.growout.nameCity = n;
    this.growout.wilayaCode = wc;
    this.growout.wilayaName = wn;
    this.growout.zipCode = zc;
    this.growout.phoneNumber = pn;

    this.addform.value["divisionName"] = t;
    this.addform.value["address"] = a;
    this.addform.value["email"] = em;
    this.addform.value["codeCity"] = c;
    this.addform.value["nameCity"] = n;
    this.addform.value["wilayaCode"] = wc;
    this.addform.value["wilayaName"] = wn;
    this.addform.value["zipCode"] = zc;
    this.addform.value["phoneNumber"] = pn;
  }
  initForm() {
    this.addform = new FormGroup({
      code: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      divisionCode: new FormControl("", [Validators.required]),
      divisionName: new FormControl("", [Validators.required]),
    });
  }

  geValues(event) {
    if (
      this.dispotrueCode == false &&
      this.dispotruename == false &&
      this.growout.code != null &&
      this.growout.code != "" &&
      this.growout.name != null &&
      this.growout.name != "" &&
      this.growout.divisionCode != null &&
      this.growout.divisionCode != "" &&
      this.growout.divisionName != null &&
      this.growout.divisionName != "" &&
      this.growout.code.toString().length >= 1 &&
      this.growout.name.toString().length >= 1 &&
      this.growout.divisionCode.toString().length >= 1 &&
      this.growout.divisionName.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  get f() {
    return this.addform.controls;
  }
  divisinv: boolean = false;
  isBlur4() {
    if (
      this.addform.value.divisionCode == "" ||
      this.growout.divisionCode == undefined
    ) {
      this.divisinv = true;
    } else {
      this.divisinv = false;
    }
  }

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.growout.code)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
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
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  minIstrueName2: boolean = false;

  isBlurDCisvalid() {
    if (this.growout.code == undefined) {
      this.DCisvalid = true;
    } else if (this.growout.code.toString().length < 1) {
      this.DCisvalid = true;
    } else {
      this.DCisvalid = false;
    }
  }

  isBlurDNisvalid() {
    if (
      this.growout.name == undefined ||
      this.growout.name.toString().length < 1
    ) {
      this.DNisvalid = true;
    } else {
      this.DNisvalid = false;
    }
  }

  isBlurSTisvali() {
    if (this.growout.divisionCode.toString().length < 3) {
      this.STisvali = true;
    } else {
      this.STisvali = false;
    }
  }

  isBlurMisvalid() {
    if (this.growout.nameCity.toString().length < 3) {
      this.Misvalid = true;
    } else {
      this.Misvalid = false;
    }
  }
}
