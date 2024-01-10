import { Component, Input } from "@angular/core";
import { seaport } from "../../models/seaport.model";

@Component({
  selector: "app-seaport-form",
  templateUrl: "./seaport-form.component.html",
  styleUrls: ["./seaport-form.component.scss"],
})
export class SeaportFormComponent {
  @Input() seaport!: seaport;
  @Input() currentStep!: number;
  constructor() {}
}
