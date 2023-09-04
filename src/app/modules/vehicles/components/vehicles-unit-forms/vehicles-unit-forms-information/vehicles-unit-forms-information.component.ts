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

 
 
  @Input() camp!: Vehicles;
  addform: FormGroup;
  divisionNames: string[] = [];
  selectedDivisionName: string = '';
  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private vehiclesService: VehiclesService

    ) {}

    ngOnInit(): void {
      this.loadDivisionNames();

      this.initForm();
    
    }
  
    loadDivisionNames() {
      this.vehiclesService.findbydivision().subscribe(data=>{
        console.log("aq::",data)
        this.divisionNames=data
      })
      
    }

  initForm() {
    this.addform = new FormGroup({
      typeDeVehicule:new FormGroup(this.camp.typeDeVehicule),
      logisticCode:new FormGroup(this.camp.logisticCode),
      weightCapacity:new FormGroup(this.camp.weightCapacity),
      utilisation:new FormGroup(this.camp.utilisation),
      coutHoraire:new FormGroup(this.camp.coutHoraire),     
    });
  
    console.log("====================================");
    console.log(" add form :", this.addform);
    console.log("====================================");
    
  }
  
//getAll Campany name from service findbycompany




  get f() {
    return this.addform.controls;
  }
  //methode pour get tous les nom from company


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
