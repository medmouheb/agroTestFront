import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { airport } from 'app/modules/airport/models/airport.model';
import { SharedService } from 'app/modules/company/services/shared.service';

@Component({
  selector: 'app-airport-notes',
  templateUrl: './airport-notes.component.html',
  styleUrls: ['./airport-notes.component.scss']
})
export class AirportNotesComponent implements OnInit {



  @Input() airport!: airport
  addform: FormGroup;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.addform = new FormGroup({
      notes: new FormControl("", [
        Validators.maxLength(200),
      ]),
    });
    
    
    
  }
  get notes() { return this.addform.get('notes') }


  geValues(event) {
    this.sharedService.setIsActive(false);
    
    
    

    
    
    
    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }

  }

}
