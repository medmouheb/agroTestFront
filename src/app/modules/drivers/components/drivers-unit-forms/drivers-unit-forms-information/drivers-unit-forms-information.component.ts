import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Drivers } from 'app/modules/drivers/models/drivers';
import { DriversService } from 'app/modules/drivers/services/drivers.service';

@Component({
  selector: 'app-drivers-unit-forms-information',
  templateUrl: './drivers-unit-forms-information.component.html',
  styleUrls: ['./drivers-unit-forms-information.component.scss']
})
export class DriversUnitFormsInformationComponent implements OnInit {

 
  @Input() camp!: Drivers;
  addform: FormGroup;
  divisionCompanyNames: string[] = [];
  selectedDivisionCompanyName: string = '';




  constructor(private sharedService: SharedService,
    private driversService: DriversService

    ) {}

    ngOnInit(): void {
      this.initForm();
      this.loadDivisionCompanyNames();

    }
    loadDivisionCompanyNames() {
      this.driversService.findbycompanyname().subscribe(
        (name: string[]) => {
          this.divisionCompanyNames = name;
        },
        (error) => {
          console.error('Error loading company names:', error);
        }
      );
 
    }
  
      
    
  
  


  initForm() {
    this.addform = new FormGroup({
      typeDeDriver: new FormControl(this.camp.typeDeDriver),
      division: new FormControl(this.camp.division),
      nombreMaximumHeureTravailles: new FormControl(this.camp.nombreMaximumHeureTravailles),
      DriverLicenceExpiration: new FormControl(this.camp.DriverLicenceExpiration),
      coutHoraire: new FormControl(this.camp.coutHoraire),
      driverLicense: new FormControl(this.camp.driverLicense),
    });
  
    
    
    
    
  }
  





  get f() {
    return this.addform.controls;
  }



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
