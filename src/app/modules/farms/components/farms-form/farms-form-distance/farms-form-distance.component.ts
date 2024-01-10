import { Component, Input, OnInit } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-distance",
  templateUrl: "./farms-form-distance.component.html",
  styleUrls: ["./farms-form-distance.component.scss"],
})
export class FarmsFormDistanceComponent implements OnInit {
  @Input() farm!: Farm;

  constructor() {}

  ngOnInit(): void {}
}
