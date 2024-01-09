import { Component, OnInit ,Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Charge } from 'app/modules/charge/models/charge.model';
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: 'app-charge-form-general',
  templateUrl: './charge-form-general.component.html',
  styleUrls: ['./charge-form-general.component.scss']
})
export class ChargeFormGeneralComponent implements OnInit {
  @Input() charge!: Charge;
  addform: FormGroup;
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.addform = new FormGroup({
      suppChargeType: new FormControl("", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
      suppNo: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      suppName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      suppType: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      transactionBase: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),
      active: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ]),

      notes: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(8),
      ])
    });
    
    
    
  }
  geValues(event) {
    
    
    

    
    
    

    this.sharedService.setIsActive(true);
  }

  get f() {
    return this.addform.controls;
  }


}
