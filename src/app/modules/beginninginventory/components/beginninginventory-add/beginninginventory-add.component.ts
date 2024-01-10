import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BeginningInventory } from "../../models/beginninginventory.model";
import { BeginninginventoryService } from "../../services/beginninginventory.service";

@Component({
  selector: "app-beginninginventory-add",
  templateUrl: "./beginninginventory-add.component.html",
  styleUrls: ["./beginninginventory-add.component.scss"],
})
export class BeginninginventoryAddComponent implements OnInit {
  @Input() camp!: BeginningInventory;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
