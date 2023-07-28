import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { underlineIcon } from '@progress/kendo-svg-icons';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';

@Component({
  selector: 'app-willaya-form-general',
  templateUrl: './willaya-form-general.component.html',
  styleUrls: ['./willaya-form-general.component.scss']
})
export class WillayaFormGeneralComponent implements OnInit {
  @Input() willaya!: Willaya;
  addform: FormGroup;
  fieldControl: FormControl;
  constructor(private sharedService: SharedService, private willayaser: WillayaService) { }

  ngOnInit(): void {
    if (this.willaya == undefined) this.willaya = { name: "", code: "" };
    this.initForm();
    this.getetat()
  }
  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,

      Validators.pattern(/^[a-zA-Z ]*$/),
    ]);
    this.addform = new FormGroup({
      code: new FormControl(null, [
        Validators.required,

      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]*$/),

      ]),
    });

    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }
  getetat() {
    if ((this.addform.status == "INVALID") || (this.willaya.code == undefined) || (this.willaya.name == undefined)) {
      this.sharedService.setIsActive(false);

    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.willaya.code == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    console.log(this.willaya.code)
    this.willayaser.findbycode(this.willaya.code).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotrueCode = true


      } else {
        this.dispotrueCode = false

      }

    }, error => {
      console.log(error.status)
      if (error.status == 404) {
        this.dispotrueCode = false

      }
    })

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

  existname() {
    console.log("e::")
    this.willayaser.findbyName(this.willaya.name).subscribe(data => {
      console.log("e::", data)
      if (data != null) {
        this.dispotruename = true
        this.newSeggestions = "chose " + this.willaya.name + this.generateRandomCode() + " or " + this.willaya.name + this.generateRandomCode() + " or " + this.willaya.name + this.generateRandomCode() + " or " + this.willaya.name + this.generateRandomCode()


      } else {
        this.dispotruename = false

      }

    }, error => console.log(error))

  }


  geValues(event) {
    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    console.log(this.willaya.code);
    console.log(this.willaya.name);
    console.log(
      "this.willaya.code.length",
      this.willaya.code.toString().length >= 5
    );
    console.log(
      this.willaya.code != null &&
      this.willaya.code != "" &&
      this.willaya.name != null &&
      this.willaya.name != "" &&
      this.willaya.code.toString().length >= 5 &&
      this.willaya.name.toString().length >= 3
    );
    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      this.fieldControl.status != "INVALID" &&
      this.willaya.code != null &&
      this.willaya.code != "" &&
      this.willaya.name != null &&
      this.willaya.name != "" &&
      this.willaya.code.toString().length >= 1 &&
      this.willaya.name.toString().length >= 1
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  get f() {
    return this.addform.controls;
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched || control.invalid);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched || control.invalid);
  }
  DCisvalid: boolean = false;
  DNisvalid: boolean = false;
  STisvali: boolean = false;
  Misvalid: boolean = false;
  isBlurDCisvalid() {
    if (this.willaya.code == undefined) {
      this.DCisvalid = true
    }
    else if (this.willaya.code.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.willaya.name == undefined) {
      this.DNisvalid = true
    }
    if (this.willaya.name.toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
  minIstrueName2: boolean = false
  isBlur2() {
    if (this.fieldControl.status == "INVALID") {
      this.minIstrueName2 = true

    }
    else if (this.fieldControl.status == "VALID") {
      this.minIstrueName2 = false

    }
  }
  isBlur3() {
    if ((this.fieldControl.value == '') || (this.fieldControl.value == undefined)) {
      this.minIstrueName2 = false

    }
  }
}
