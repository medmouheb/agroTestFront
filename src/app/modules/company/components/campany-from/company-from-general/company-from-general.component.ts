import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { SharedService } from "app/modules/company/services/shared.service";
import { Company } from "../../../models/comany";
@Component({
  selector: "app-company-from-general",
  templateUrl: "./company-from-general.component.html",
  styleUrls: ["./company-from-general.component.scss"],
})
export class CompanyFromGeneralComponent implements OnInit {
  @Input() camp!: Company;

  @ViewChild("addform")
  addform: FormGroup;
  fieldControl: FormControl;
  constructor(private sharedService: SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.camp !=null) {console.log("olll") 
    this.sharedService.setIsActive(true);
  };

    if (this.camp == undefined) { this.camp = { name: "", code: "" } };
    this.initForm();
    console.log(this.addform);
  }

  initForm() {
    this.fieldControl = new FormControl('', [
      Validators.required,
     
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]);



    this.addform = this.fb.group({
      code: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      name: [
        null,
        [Validators.required,],
      ],
    });

  }

  minIstrueCode: boolean = false
  isBlur() {

    if (this.camp.code == undefined) {
      this.minIstrueCode = true
    }
    else if (this.camp.code.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }

  minIstrueName: boolean = false
  minIstrueName2: boolean = false
  isBlur2() {
    console.log(this.minIstrueName2)
    console.log('===3:',this.fieldControl.value
    )

    if (this.fieldControl.status == "INVALID") {
      this.minIstrueName2 = true

    }
    else if (this.fieldControl.status == "VALID") {
      this.minIstrueName2 = false

    }
  }
  isBlur3() {
    if ((this.fieldControl.value == '')||(this.fieldControl.value == undefined)) {
      this.minIstrueName2 = false

    }
  }
  isBlur1() {
    console.log(this.minIstrueName2)
    if (this.camp.name == undefined) {
      this.minIstrueName = true

    
    }
    else if (this.camp.name.toString().length < 1) {
      this.minIstrueName = true
      
    }
    else {
      this.minIstrueName = false
     
    }
  }
  geValues(event) {
    console.log(this.fieldControl)

    if (
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
}
