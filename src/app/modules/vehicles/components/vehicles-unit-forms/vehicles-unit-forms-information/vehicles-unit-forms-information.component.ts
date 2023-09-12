import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Vehicles } from 'app/modules/vehicles/models/vehicles';
import { VehiclesService } from 'app/modules/vehicles/services/vehicles.service';
import { VehiculeService } from 'app/modules/vehicule/Services/vehicule.service';

@Component({
  selector: 'app-vehicles-unit-forms-information',
  templateUrl: './vehicles-unit-forms-information.component.html',
  styleUrls: ['./vehicles-unit-forms-information.component.scss']
})
export class VehiclesUnitFormsInformationComponent implements OnInit {

 
 
  @Input() 
  camp: Vehicles= {}
  addform: FormGroup;
  divisionNames: string[] = [];
  selectedDivisionName: string = '';
  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private vehiclesService: VehiclesService

    ) {}

    ngOnInit(): void {
      this.loadDivisionNames();


    
    }
  
    loadDivisionNames() {
      this.vehiclesService.findbydivision().subscribe(data=>{
        console.log("aq::",data)
        this.divisionNames=data
      })
      
    }




}
