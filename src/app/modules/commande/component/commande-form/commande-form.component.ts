import { Component, Input, OnInit } from '@angular/core';
import { Commande } from '../../models/commande.model';

@Component({
  selector: 'app-commande-form',
  templateUrl: './commande-form.component.html',
  styleUrls: ['./commande-form.component.scss']
})
export class CommandeFormComponent implements OnInit {

  @Input() commande!: Commande
  @Input() currentStep!: number

  constructor() { }

  ngOnInit(): void {
  }
}
