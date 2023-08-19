import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { seaport } from 'app/modules/seaport/models/seaport.model';

@Component({
  selector: 'app-seaport-form-general',
  templateUrl: './seaport-form-general.component.html',
  styleUrls: ['./seaport-form-general.component.scss']
})
export class SeaportFormGeneralComponent implements OnInit {

  @Input() seaport!: seaport;

  addform: FormGroup;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.addform = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[+]?\d+(\.\d+)?$/)

      ]),
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(50),
      ])
    });
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
  }
  get code() { return this.addform.get('code') }
  get name() { return this.addform.get('name') }

  geValues(event) {
    this.sharedService.setIsActive(false);

    console.log("====================================");
    console.log("event :", event);
    console.log("====================================");

    console.log("====================================");
    console.log("le formulaire :", this.addform);
    console.log("====================================");

    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }
  }



  get f() {
    return this.addform.controls;
  }


}