import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { ShipmethodsService } from 'app/modules/ship-methods/Services/shipmethods.service';
import { ShipMethods } from 'app/modules/ship-methods/models/shipsmethods';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-shipmethods-form-general',
  templateUrl: './shipmethods-form-general.component.html',
  styleUrls: ['./shipmethods-form-general.component.scss']
})
export class ShipmethodsFormGeneralComponent implements OnInit {
  @Input() shipmethod!: ShipMethods
  shipmethodReplica!: ShipMethods
  addform: FormGroup;
  constructor(private sharedService: SharedService, private shipmethodservice: ShipmethodsService, private dialogComponent: DialogComponent) { }
  codes: Array<String> = [];
  names: Array<String> = [];
  ngOnInit(): void {
    if (this.shipmethod == undefined) this.shipmethod = { name: "", code: "" };
    this.initForm();

    if (this.codeList.indexOf(this.shipmethod.code) != -1) {
      this.otherCondition = true
    }

    this.shipmethodservice.findAll().subscribe(data => {
      this.codes = data.map(el => { return el.code })
      this.names = data.map(el => { return el.name })

    })

  }
  initForm() {

    this.addform = new FormGroup({
      code: new FormControl(null, [
        Validators.required,

      ]),
      name: new FormControl(null, [
        Validators.required

      ]),
      notes: new FormControl(null),
      active: new FormControl(null),
    });

    console.log("====================================");
    console.log(" add form :", this.addform.value);
    console.log("====================================");
  }



  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.shipmethod.code == null) {
      this.dispotrueCode = false

    }
  }
  static = ""
  exist() {
    if (this.codes.indexOf((this.shipmethod.code + "")) != -1) {
      if (this.static == "update") {
        if (this.shipmethod.code == this.shipmethodReplica.code) {
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
  newSeggestions = ""

  existname() {
    if (this.names.indexOf(this.shipmethod.name) != -1) {
      if (this.static == "update") {
        if (this.shipmethod.name == this.shipmethodReplica.name) {
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
  geValues(event) {
    console.log("rtr::", this.dispotrueCode == false, this.dispotruename == false,

      this.shipmethod.code != null,
      this.shipmethod.code != "",
      this.shipmethod.name != null,
      this.shipmethod.name != "",
      this.shipmethod.code.toString().length >= 1,
      this.shipmethod.name.toString().length >= 1)
    if (
      this.dispotrueCode == false && this.dispotruename == false &&

      this.shipmethod.code != null &&
      this.shipmethod.code != "" &&
      this.shipmethod.name != null &&
      this.shipmethod.name != "" &&
      this.shipmethod.code.toString().length >= 1 &&
      this.shipmethod.name.toString().length >= 1
    ) {
      this.dialogComponent.setsubmitstatus(true);
    } else {
      this.dialogComponent.setsubmitstatus(false);

    }



  }

  get f() {
    return this.addform.controls;
  }

  codeList = ["AIR", "DEL", "Ground", "SEA", "RAIL", "P/U"]

  otherCondition = false

  setList() {
    console.log(this.shipmethod.code)
    let ch = this.shipmethod.code
    switch (ch) {
      case "AIR":
        this.shipmethod.name = "Air";
        this.otherCondition = false

        break;
      case "DEL":
        this.shipmethod.name = "Delivery";
        this.otherCondition = false

        break;
      case "Ground":
        this.shipmethod.name = "Ground";
        this.otherCondition = false

        break;
      case "SEA":
        this.shipmethod.name = "Sea";
        this.otherCondition = false

        break;
      case "RAIL":
        this.shipmethod.name = "Rail/Train";
        this.otherCondition = false

        break;
      case "P/U":
        this.shipmethod.name = "Pick-up";
        this.otherCondition = false

        break;

      default: this.otherCondition = true
        this.shipmethod.name = ""
        this.shipmethod.code = ""
        break;

    }
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
    if (this.shipmethod.code == undefined) {
      this.DCisvalid = true
    }
    else if (this.shipmethod.code.toString().length < 1) { this.DCisvalid = true }
    else {
      this.DCisvalid = false
    }
  }

  isBlurDNisvalid() {
    if (this.shipmethod.name == undefined) {
      this.DNisvalid = true
    }
    if (this.shipmethod.name.toString().length < 1) { this.DNisvalid = true }
    else {
      this.DNisvalid = false
    }
  }
  minIstrueName2: boolean = false

}
