import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Vehicles } from 'app/modules/vehicles/models/vehicles';
import { VehiclesService } from 'app/modules/vehicles/services/vehicles.service';
import { error } from 'console';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-vehicles-unit-forms-historique-de-maintenance',
  templateUrl: './vehicles-unit-forms-historique-de-maintenance.component.html',
  styleUrls: ['./vehicles-unit-forms-historique-de-maintenance.component.scss']
})
export class VehiclesUnitFormsHistoriqueDeMaintenanceComponent implements OnInit {

 
 
  @Input() camp!: Vehicles;
  addform: FormGroup;

  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private vehiclesService: VehiclesService
    ) {}

    ngOnInit(): void {
      this.initForm();
    }
  

  
  
    handleFile(file: any) {
      let dataFile = new FormData();
      dataFile.append("file", file.target.files[0]);
      this.vehiclesService.uploadImage(dataFile).subscribe((res) => {

        
        this.addform.get('papiersDuVehicule')
        
        
        localStorage.setItem("avatar", res);
        // console.log("uploadImage success");
        
      },(error)=>{
        this.camp.papiersDuVehicule=        error.error.text
      
     
        this.addform.get('papiersDuVehicule').
        setValue(error.error.text);
      });
    }

   


  initForm() {
    this.addform = new FormGroup({
      nomOperationmaintenance:new FormGroup(this.camp.nomOperationmaintenance),
      numeroopérationmaintenance:new FormGroup(this.camp.numerooperationmaintenance),
      dateDerealisation:new FormGroup(this.camp.dateDerealisation),
      KilometrageDerealisation:new FormGroup(this.camp.KilometrageDerealisation),
      listeDesOperationsEffectuees:new FormGroup(this.camp.listeDesOperationsEffectuees),
      papiersDuVehicule:new FormGroup(this.camp.papiersDuVehicule),
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
