import { Component, Input } from "@angular/core";
import { reason } from "../../models/reason.model";

@Component({
  selector: "app-reason-form",
  templateUrl: "./reason-form.component.html",
  styleUrls: ["./reason-form.component.scss"],
})
export class ReasonFormComponent {
  @Input() reason!: reason;
  @Input() currentStep!: number;
  constructor() {}
}
