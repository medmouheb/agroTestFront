import { Component, Input, OnInit } from '@angular/core';
import { VihicleType } from '../../models/vehicleType';

@Component({
  selector: 'app-vehicle-type-form',
  templateUrl: './vehicle-type-form.component.html',
  styleUrls: ['./vehicle-type-form.component.scss']
})
export class VehicleTypeFormComponent implements OnInit {
  @Input() camp!: VihicleType;
  @Input() currentStep!: number;
  wizardStep!: number;
  constructor() { }

  ngOnInit(): void {
    this.wizardStep = 1;
    console.log("aq::",this.camp)

  }

}
