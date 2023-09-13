import { Component, OnInit, Input } from '@angular/core';
import { Farm } from '../../../models/farm';

@Component({
  selector: 'app-farms-form-localisation',
  templateUrl: './farms-form-localisation.component.html',
  styleUrls: ['./farms-form-localisation.component.scss']
})
export class FarmsFormLocalisationComponent implements OnInit {
  @Input() farm!: Farm

  constructor() { }

  ngOnInit(): void {
    console.log("44::",this.farm)
  }

  emailIsvalid = false

validationEmail() {
  const emailRegex: RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  console.log(this.farm.email)
  if (emailRegex.test(this.farm.email)) {
    this.emailIsvalid = false;
  console.log(this.farm.email)

  }
  else {
  this.emailIsvalid=true
  }

}


}
