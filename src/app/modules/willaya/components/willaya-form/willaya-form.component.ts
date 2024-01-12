import { Component, Input, OnInit } from "@angular/core";
import { Willaya } from "../../models/willaya";

@Component({
  selector: "app-willaya-form",
  templateUrl: "./willaya-form.component.html",
  styleUrls: ["./willaya-form.component.scss"],
})
export class WillayaFormComponent implements OnInit {
  @Input() willaya!: Willaya;
  @Input() currentStep!: number;

  constructor() {}

  ngOnInit(): void {}
}
