import { Component, Input, OnInit } from '@angular/core';
import { Drivers } from '../../models/drivers';

@Component({
  selector: 'app-drivers-unit-forms',
  templateUrl: './drivers-unit-forms.component.html',
  styleUrls: ['./drivers-unit-forms.component.scss']
})
export class DriversUnitFormsComponent implements OnInit {

  @Input() camp!: Drivers;
  @Input() currentStep!: number;
  wizardStep!: number;

  constructor() {}

  ngOnInit(): void {
    this.wizardStep = 1;
  }
}
