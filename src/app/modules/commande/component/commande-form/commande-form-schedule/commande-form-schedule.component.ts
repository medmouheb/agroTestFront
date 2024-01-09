import { Component, Input, OnInit } from '@angular/core';
import { Commande } from 'app/modules/commande/models/commande.model';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-commande-form-schedule',
  templateUrl: './commande-form-schedule.component.html',
  styleUrls: ['./commande-form-schedule.component.scss'],
})
export class CommandeFormScheduleComponent implements OnInit {
  @Input() commande!: Commande;
  formGroup!: FormGroup; // Define the formGroup property

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      participant: this.formBuilder.array([]),
    });


    if (!this.commande.paymentTerm) {
      this.commande.paymentTerm = {
        paymentCount: 0,
        scheduleBasisUnit: '',
        paymentRate: 0,
      };
    }
  }

  onAdd() {
    const control = this.formGroup.controls['participant'] as FormArray;

  }
}
