import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { CostCenter } from "app/modules/cost-center/model/cost-center";
import { Division } from "app/modules/division/models/division";
import { DivisionService } from "app/modules/division/services/division.service";

@Component({
  selector: "app-cost-center-form-information",
  templateUrl: "./cost-center-form-information.component.html",
  styleUrls: ["./cost-center-form-information.component.scss"],
})
export class CostCenterFormInformationComponent implements OnInit {
  @Input() cost!: CostCenter;
  divisions: Array<Division> = [];
  addform: FormGroup;
  affichetype: boolean = false
  constructor(private sharedService: SharedService, private divisionService: DivisionService) { }

  ngOnInit(): void {
        if (this.cost.division_Code == undefined || this.cost.division_Code == "") {
      this.affiche = false
    } else {
      this.affiche = true
    }
    if (this.cost.facilityType == 'Farm') {

      this.affichetype = true}
    this.initForm();
    this.getAlldivision()
    this.getetat()


  }
  getAlldivision() {
    this.divisionService.findAll().subscribe({
      next: (result) => { this.divisions = result; },
      error: (error) => console.error(error),
    });
  }

  initForm() {
    this.addform = new FormGroup({
      address: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      division_Name: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),
      division_Code: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
      ]),

      codeCity: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      nameCity: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      facilityType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
    });
  }
  div: any
  affiche: boolean = false

  setvalue() {
    if (this.cost.division_Code == undefined || this.cost.division_Code == "") {
      this.affiche = false
    } else {
      this.affiche = true
    }
  }

  selectVAlue(e: any) {
    let t = this.divisions.filter(el => { return el.code == e.target.value })[0]
    this.addform.value.division_Name = t.name
    this.cost.division_Name = t.name
    this.cost.division_Code = t.code
    this.cost.speciesType = t.divisiontype

   this.cost.divisiontype = t.divisiontype
    this.addform.value['division_Name'] = t
    this.div = t
    this.affiche = true
  }
  selectVAlue2(e: any) {
    let t = this.divisions.filter(el => { return el.name == e.target.value })[0]
    this.addform.value.division_Code = t.code
    this.cost.division_Name = t.name
    this.cost.division_Code = t.code
    this.cost.speciesType = t.divisiontype

    this.cost.divisiontype = t.divisiontype

    this.addform.value['division_Name'] = t
    this.div = t
  }
  getetat() {
    if(this.cost.division_Code){
      this.sharedService.setIsActive(true);
    }else{
      this.sharedService.setIsActive(false);

    }


  }


  geValues(event) {


    if (this.cost.facilityType == 'Farm') {

      this.affichetype = true
      this.cost.farmType = this.div.speciesType
      this.cost.speciesType = this.div.divisiontype

    } else {
      this.affichetype = false
      this.cost.farmType = ""

    }

    if (this.cost.division_Code != "" && this.cost.division_Code != undefined &&
      this.cost.facilityType != null && this.cost.facilityType != '' &&
      this.cost.divisiontype != '' &&
      this.cost.divisiontype != null) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }


  }
  get f() {
    return this.addform.controls;
  }

  divisinv: boolean = false

  isBlur5() {
    if ((this.cost.division_Code == "") || (this.cost.division_Code == undefined)) {
      this.divisinv = true
    } else {
      this.divisinv = false

    }
  }
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
  minIfarmtype: boolean = false;

  isBlur() {
    if ((this.cost.farmType.toString().length < 5) || (this.cost.farmType.toString().length > 6)) {
      this.minIfarmtype = true;
    } else {
      this.minIfarmtype = false;
    }
  }
  minIfacilityType: boolean = false;

  isBlur2() {
    if ((this.cost.facilityType.toString().length > 11)) {
      this.minIfacilityType = true;
    } else {
      this.minIfacilityType = false;
    }
  }
  minIdivisiontype: boolean = false;

  isBlur3() {
    if (this.cost.divisiontype.toString().length > 11) {
      this.minIdivisiontype = true;
    } else {
      this.minIdivisiontype = false;
    }
  }
  minIdivision: boolean = false;

  isBlur4() {
    if (this.cost.division_Code.toString().length > 11) {
      this.minIdivision = true;
    } else {
      this.minIdivision = false;
    }
  }

}
