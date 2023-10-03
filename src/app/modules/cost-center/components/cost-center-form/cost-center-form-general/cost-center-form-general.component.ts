import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CostCenter } from "app/modules/cost-center/model/cost-center";
import { CostCenterService } from "app/modules/cost-center/services/cost-center.service";

@Component({
  selector: "app-cost-center-form-general",
  templateUrl: "./cost-center-form-general.component.html",
  styleUrls: ["./cost-center-form-general.component.scss"],
})
export class CostCenterFormGeneralComponent implements OnInit {
  errormessage: string;
  CostcenterFormGroup!: FormGroup;

  @Input() cost!: CostCenter;
  costreplica!: CostCenter;

  @ViewChild("addform")
  addform: FormGroup;
  fieldControl: FormControl;

  constructor(private sharedService: SharedService, private costserv: CostCenterService) { }
  names: Array<String> = [];
  codes: Array<String> = [];
  static = ""

  ngOnInit(): void {
    this.initForm();
    if (this.cost.code != null) {
      console.log("all")
      this.sharedService.setIsActive(true);

    } else {
      this.sharedService.setIsActive(false);
    }

    this.costserv.findAll().subscribe(data => {
      this.names = data.map(el => {
        return el.name
      })
      this.codes = data.map(el => {
        return el.code
      })
    })

    if (this.cost.id) {
      this.static = "update"
      this.costreplica = JSON.parse(JSON.stringify(this.cost))
    } else if (!this.cost.id) {
      this.static = "create"
      this.sharedService.setIsActive(false)
    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false

  blur1() {
    if (this.cost.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    if (this.codes.indexOf(this.cost.code) != -1) {
      if (this.static == "update") {
        if (this.cost.code == this.costreplica.code) {
          this.dispotrueCode = false
        } else {
          this.dispotrueCode = true
        }
      } else {
        this.dispotrueCode = true
      }
    } else {
      this.dispotrueCode = false
    }


  }


  generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

  newSeggestions = ""
  test = false
  existname() {
    if (this.names.indexOf(this.cost.name) != -1) {
      if (this.static == "update") {
        if (this.cost.name == this.costreplica.name) {
          this.dispotruename = false
        } else {
          this.dispotruename = true
        }
      } else {
        this.dispotruename = true
      }
    } else {
      this.dispotruename = false
    }
  }


  initForm() {

    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,

      ]),
      name: new FormControl("", [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z ]*$/),

      ]),
      typecost: new FormControl("", [
        Validators.required,

      ]),

    });
    console.log("====================================");
    console.log(" add form :", this.addform.value);
    console.log(" add form :", this.cost);
    console.log("====================================");
  }

  nom: string = "";
  code: string = "";
  isNomValid() {
    return this.nom.length > 5;
  }
  minIstrueName2: boolean = false
  // isBlur2() {
  //   if (this.fieldControl.status == "INVALID") {
  //     this.minIstrueName2 = true

  //   }
  //   else if (this.fieldControl.status == "VALID") {
  //     this.minIstrueName2 = false

  //   }
  // }
  isCodeValid() {
    return this.nom.length > 5;
  }
  getvalue(event) {
    this.existname()
    console.log(this.cost.code != null)
    console.log(this.cost.code != "")
    console.log(this.cost.name != null)
    console.log(this.cost.name != "")

    console.log(this.cost.code.toString().length >= 1)
    console.log(this.dispotrueCode)
    console.log(this.dispotruename)
    console.log(this.test)
    console.log(this.minIstrueCode)
    console.log(this.cost.name.toString().length >= 1)

    if (
      this.cost.code != null &&
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 1 &&
      this.dispotrueCode == false && this.dispotruename == false && this.minIstrueCode == false &&
      this.cost.name.toString().length >= 1

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  geValuesCode(event) {
    this.cost.code = event.target.value;
    console.log("test:", this.cost.name);

    console.log("====================================");
    console.log("eventcode :", event.target.value);
    console.log("eventcode :", event.target.value);
    console.log("====================================");
    console.log("testt", this.cost.code != null &&
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 1 &&
      this.dispotrueCode == false && this.dispotruename == false && this.minIstrueCode == false &&
      this.cost.name.toString().length >= 1)
    if (
      this.cost.code != null &&
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 1 &&
      this.dispotrueCode == false && this.dispotruename == false && this.minIstrueCode == false &&
      this.cost.name.toString().length >= 1

    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  geValuesNom(event) {
    console.log("test:", this.cost.name);
    console.log("test:", this.dispotruename);

    this.cost.name = event.target.value;
    console.log("====================================");
    console.log("eventname :", event.target.value);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    if (
      this.cost.code != "" &&
      this.cost.name != null &&
      this.cost.name != "" &&
      this.cost.code.toString().length >= 1 &&
      this.dispotrueCode == false && this.dispotruename == false && this.minIstrueCode == false &&
      this.cost.name.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }
  get f() {
    return this.addform.controls;
  }
  // isBlur3() {
  //   if ((this.fieldControl.value == '') || (this.fieldControl.value == undefined)) {
  //     this.minIstrueName2 = false

  //   }
  // }
  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  minIstrueCode: boolean = false;
  isBlur() {
    if (this.cost.code == undefined) {
      this.minIstrueCode = true;

    }
    if (this.cost.code.toString().length == 0 && this.cost.code == "") {
      this.minIstrueCode = true;
    } else {
      this.minIstrueCode = false;
    }
  }

  minIstrueName: boolean = false;
  isBlur1() {
    if (this.cost.name === undefined) {
      this.minIstrueName = true

    }
    else if (this.cost.name.toString().length == 0 && this.cost.name == "") {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }


  codeIsvalid = false

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    console.log(this.cost.code)
    if (codeRegex.test(this.cost.code)) {
      this.codeIsvalid = false;
      console.log(this.cost.code)

    }
    else {
      this.codeIsvalid = true
    }

  }
}
