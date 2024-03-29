import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { reason } from "app/modules/reason-code/models/reason.model";
import { seaport } from "app/modules/seaport/models/seaport.model";

@Component({
  selector: "app-reason-information",
  templateUrl: "./reason-information.component.html",
  styleUrls: ["./reason-information.component.scss"],
})
export class ReasonInformationComponent implements OnInit {
  @Input() reason!: reason;
  addform: FormGroup;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      notes: new FormControl("", [Validators.maxLength(200)]),
    });
  }
  get notes() {
    return this.addform.get("notes");
  }

  geValues(event) {
    this.sharedService.setIsActive(false);
    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }
  }
}
