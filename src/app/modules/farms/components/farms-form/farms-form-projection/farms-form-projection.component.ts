import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'app/modules/farms/models/farm';

@Component({
  selector: 'app-farms-form-projection',
  templateUrl: './farms-form-projection.component.html',
  styleUrls: ['./farms-form-projection.component.scss']
})
export class FarmsFormProjectionComponent implements OnInit {
  @Input() farm!: Farm;
  constructor() { }

  ngOnInit(): void {
  }

}