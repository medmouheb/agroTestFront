import { Component, Input, OnInit } from '@angular/core';
import { ShipMethods } from '../../models/shipsmethods';

@Component({
  selector: 'app-shipmethods-form',
  templateUrl: './shipmethods-form.component.html',
  styleUrls: ['./shipmethods-form.component.scss']
})
export class ShipmethodsFormComponent implements OnInit {
  @Input() shipmethod!: ShipMethods
@Input() shipmethodsStep!:number

  constructor() { }

  ngOnInit(): void {
  }

}
