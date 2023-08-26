import { Component, Input, OnInit } from '@angular/core';
import { Vehicles } from '../../models/vehicles';

@Component({
  selector: '<app-vehicles-unit-forms>',
  templateUrl: './vehicles-unit-forms.component.html',
  styleUrls: ['./vehicles-unit-forms.component.scss']
})
export class VehiclesUnitFormsComponent implements OnInit {
  @Input() camp!: Vehicles;
  @Input() currentStep!: number;


  constructor() {}

  ngOnInit(): void {

  }

}
