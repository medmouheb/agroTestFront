import { Component, Input, OnInit } from "@angular/core";
import { Farm } from "app/modules/farms/models/farm";

@Component({
  selector: "app-farms-form-ressource",
  templateUrl: "./farms-form-ressource.component.html",
  styleUrls: ["./farms-form-ressource.component.scss"],
})
export class FarmsFormRessourceComponent implements OnInit {
  @Input() farm!: Farm;
  constructor() {}

  ngOnInit(): void {}
}
