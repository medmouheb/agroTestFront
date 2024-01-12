import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { DeliveryService } from "app/modules/delivery-instruction/Services/delivery.service";
import { Delivery } from "app/modules/delivery-instruction/models/delivery";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";

@Component({
  selector: "app-delivery-form-general",
  templateUrl: "./delivery-form-general.component.html",
  styleUrls: ["./delivery-form-general.component.scss"],
})
export class DeliveryFormGeneralComponent implements OnInit {
  @Input() delivery!: Delivery;
  deliveryReplica!: Delivery;
  addform: FormGroup;
  codes: Array<String> = [];
  names: Array<String> = [];
  Types: Array<String> = [];

  constructor(
    private sharedService: SharedService,
    private dialogComponent: DialogComponent,
    private deliveryService: DeliveryService,
  ) {}

  ngOnInit(): void {
    if (this.delivery == undefined)
      this.delivery = {
        productType: "",
        instructiuonCode: "",
      };
    this.infiForm();
    this.sharedService.setIsActive(false);
    this.deliveryService.findAll().subscribe((data) => {
      this.codes = data.map((el) => {
        return el.instructiuonCode;
      });
      this.names = data.map((el) => {
        return el.instructiuonName;
      });
      this.Types = data.map((el) => {
        return el.productType;
      });
    });

    // if(["ExpD","MCT","SW","MPC","RRC","CH"].indexOf(this.delivery.productType)!=-1 && this.delivery.id){
    //   this.afficheother=true
    // }
    if (this.delivery.id) {
      this.static = "update";
      this.deliveryReplica = JSON.parse(JSON.stringify(this.delivery));
    } else if (!this.delivery.id) {
      this.static = "create";
      this.sharedService.setIsActive(false);
    }
  }

  id = "";
  getstatus() {
    if (this.delivery.id) {
      this.static = "update";
      if (this.id != this.delivery.id) {
        this.id = this.delivery.id;
        this.deliveryReplica = JSON.parse(JSON.stringify(this.delivery));
      }

      return "update";
    } else if (!this.delivery.id) {
      this.static = "create";
      this.getValue("z");
      return "create";
    }
  }
  infiForm() {
    this.addform = new FormGroup({
      productType: new FormControl(null, [Validators.required]),
      instructiuonCode: new FormControl(null, [Validators.required]),
      instructiuonName: new FormControl(null, [Validators.required]),
      notes: new FormControl(null),
      active: new FormControl(null),
    });
  }
  getList() {
    if (this.delivery.productType == "") {
      return true;
    } else {
      return false;
    }
  }
  setname() {
    switch (this.delivery.instructiuonCode) {
      case "CH":
        this.delivery.instructiuonName = "Check Chick Health";
        this.addform.patchValue({ instructiuonName: "Check Chick Health" });
        break;
      case "RRC":
        this.delivery.instructiuonName = "Remove and replace Culls";
        this.addform.value.instructiuonName = "Remove and replace Culls";

        break;
      case "MPC":
        this.delivery.instructiuonName = "Test Moisture % Before Weighing";
        break;
      case "SW":
        this.delivery.instructiuonName = "Shrink Wrap";
        break;
      case "MCT":
        this.delivery.instructiuonName = "Maintain Constant Temperature";
        break;
      case "ExpD":
        this.delivery.instructiuonName = "Verify Expiry Date on Label";
        break;
    }
  }
  listA: String[] = [];
  affichecode: boolean = false;
  setList() {
    switch (this.delivery.productType) {
      case "Animal":
        this.listA = ["CH", "RPC"];
        break;
      case "Ingredients":
        this.listA = ["MPC"];
        break;
      case "Eggs":
        this.listA = ["SW"];
        break;
      case "Vaccines":
        this.listA = ["MCT", "ExpD"];
        break;
      case "":
        this.affichecode = true;
        break;
    }
    this.delivery.instructiuonCode = "";
  }
  afficheother: boolean = false;
  select() {
    if (this.delivery.productType === "") {
      this.afficheother = true;
      this.delivery.productType = "";
    } else {
      this.afficheother = false;
    }
  }
  getValue(event) {
    if (
      !this.dispotrueType &&
      !this.dispotrueCode &&
      !this.dispotruename &&
      this.delivery.productType != null &&
      this.delivery.productType != "null" &&
      this.delivery.productType.length > 0 &&
      this.delivery.instructiuonName != null &&
      this.delivery.instructiuonName != "" &&
      this.delivery.instructiuonName.length > 0 &&
      this.delivery.instructiuonCode != null &&
      this.delivery.instructiuonCode != "null" &&
      this.delivery.instructiuonCode.length > 0
    ) {
      this.dialogComponent.setsubmitstatus(true);
    } else {
      this.dialogComponent.setsubmitstatus(false);
    }
  }
  get f() {
    return this.addform.controls;
  }

  dispotrueCode: boolean = false;
  dispotruename: boolean = false;
  dispotrueType: boolean = false;

  static = "";
  exist() {
    if (this.codes.indexOf(this.delivery.instructiuonCode + "") != -1) {
      if (this.static == "update") {
        if (
          this.deliveryReplica.instructiuonCode ==
          this.delivery.instructiuonCode
        ) {
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

  existType() {
    if (this.Types.indexOf(this.delivery.productType + "") != -1) {
      if (this.static == "update") {
        if (this.deliveryReplica.productType == this.delivery.productType) {
          this.dispotrueType = false;
        } else {
          this.dispotrueType = true;
        }
      } else {
        this.dispotrueType = true;
      }
    } else {
      this.dispotrueType = false;
    }
  }

  existname() {
    if (this.names.indexOf(this.delivery.instructiuonName) != -1) {
      if (this.static == "update") {
        if (
          this.delivery.instructiuonName ==
          this.deliveryReplica.instructiuonName
        ) {
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
}
