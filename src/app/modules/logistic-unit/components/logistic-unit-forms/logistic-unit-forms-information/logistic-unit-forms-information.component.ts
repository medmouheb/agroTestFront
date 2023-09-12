import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Company } from 'app/modules/company/models/comany';
import { CompanyService } from 'app/modules/company/services/company.service';
import { SharedService } from 'app/modules/company/services/shared.service';
import { LogisticUnit } from 'app/modules/logistic-unit/models/logistic-unit';
import { LogisticUnitService } from 'app/modules/logistic-unit/services/logistic-unit.service';

@Component({
  selector: 'app-logistic-unit-forms-information',
  templateUrl: './logistic-unit-forms-information.component.html',
  styleUrls: ['./logistic-unit-forms-information.component.scss']
})
export class LogisticUnitFormsInformationComponent implements OnInit {

 
  @Input() camp!: LogisticUnit;
  addform: FormGroup;
  companyNames: string[] = [];
  selectedCompanyName: string = '';
  divisionNames: string[] = [];
  selectedDivisionName: string = '';

  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private logisticUnitService: LogisticUnitService

    ) {}

    ngOnInit(): void {
   
      this.loadCompanyNames();
      this.loadDivisionNames();
    }
  
    loadCompanyNames() {
      this.logisticUnitService.findbycompany().subscribe(
        (name: string[]) => {
          this.companyNames = name;
        },
        (error) => {
          console.error('Error loading company names:', error);
        }
      );
    }
    loadDivisionNames() {
      this.logisticUnitService.findbydivision().subscribe(
        (name: string[]) => {
          this.divisionNames = name;
        },
        (error) => {
          console.error('Error loading company names:', error);
        }
      );
    }
    
      
    
  
  




  
  
//getAll Campany name from service findbycompany






  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  minIwillaya: boolean = false


}
