import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { manufacturer } from "app/modules/manufacturer/Models/manufacturer.model";

@Component({
  selector: "app-manufacturer-form-notes",
  templateUrl: "./manufacturer-form-notes.component.html",
  styleUrls: ["./manufacturer-form-notes.component.scss"],
})
export class ManufacturerFormNotesComponent implements OnInit {
  @Input() manufacturer!: manufacturer;
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
