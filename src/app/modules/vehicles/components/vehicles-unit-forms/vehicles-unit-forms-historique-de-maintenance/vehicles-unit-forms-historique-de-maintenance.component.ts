import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Vehicles } from "app/modules/vehicles/models/vehicles";
import { VehiclesService } from "app/modules/vehicles/services/vehicles.service";
import { error } from "console";
import { environment } from "environments/environment";

@Component({
  selector: "app-vehicles-unit-forms-historique-de-maintenance",
  templateUrl: "./vehicles-unit-forms-historique-de-maintenance.component.html",
  styleUrls: ["./vehicles-unit-forms-historique-de-maintenance.component.scss"],
})
export class VehiclesUnitFormsHistoriqueDeMaintenanceComponent
  implements OnInit
{
  uploadText1 = "upload";

  @Input()
  camp: Vehicles = {};
  addform: FormGroup;

  listStrings = [];

  constructor(
    private sharedService: SharedService,
    private vehiclesService: VehiclesService,
  ) {}

  ngOnInit(): void {
    this.vehiclesService.findAll().subscribe((data) => {
      this.listStrings = data.map((el) => {
        return el.listeDesOperationsEffectuees;
      });
    });
  }

  otherChek = false;

  changeotherChek() {
    this.otherChek = !this.otherChek;
  }

  handleFile(file: any) {
    let dataFile = new FormData();
    this.uploadText1 = file.target.files[0].name;
    dataFile.append("file", file.target.files[0]);
    this.vehiclesService.uploadImage(dataFile).subscribe(
      (res) => {
        this.addform.get("papiersDuVehicule");

        localStorage.setItem("avatar", res);
      },
      (error) => {
        this.camp.papiersDuVehicule = error.error.text;

        this.addform.get("papiersDuVehicule").setValue(error.error.text);
      },
    );
  }

  codeIsvalid = false;

  validationCode() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;

    if (codeRegex.test(this.camp.nomOperationmaintenance)) {
      this.codeIsvalid = false;
    } else {
      this.codeIsvalid = true;
    }
  }

  codeIsvalid1 = false;

  validationCode1() {
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;

    if (codeRegex.test(this.camp.numerooperationmaintenance)) {
      this.codeIsvalid1 = false;
    } else {
      this.codeIsvalid1 = true;
    }
  }
}
