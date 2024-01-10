import { Component, Input } from "@angular/core";
import { Willaya } from "../../models/willaya";

@Component({
  selector: "app-willaya-form",
  templateUrl: "./willaya-form.component.html",
  styleUrls: ["./willaya-form.component.scss"],
})
export class WillayaFormComponent {
  @Input() willaya!: Willaya;
  @Input() currentStep!: number;

  constructor() {}
}
