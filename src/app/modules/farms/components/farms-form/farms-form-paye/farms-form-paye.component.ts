import { Component, Input, OnInit } from '@angular/core';
import { Farm } from 'app/modules/farms/models/farm';

@Component({
  selector: 'app-farms-form-paye',
  templateUrl: './farms-form-paye.component.html',
  styleUrls: ['./farms-form-paye.component.scss']
})
export class FarmsFormPayeComponent implements OnInit {
  @Input() farm!: Farm;
  constructor() { }

  ngOnInit(): void {
  }

}
