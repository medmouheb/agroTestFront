import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { ProductUsage } from 'app/modules/product-usage/model/product-usage';
import { ProductUsageService } from 'app/modules/product-usage/service/product-usage.service';

@Component({
  selector: 'app-product-usage-forms-information',
  templateUrl: './product-usage-forms-information.component.html',
  styleUrls: ['./product-usage-forms-information.component.scss']
})
export class ProductUsageFormsInformationComponent implements OnInit {

 
  @Input() camp!: ProductUsage;
  addform: FormGroup;

  divisionNames: string[] = [];
  selectedDivisionName: string = '';

  // Array to hold the list of companies


  constructor(private sharedService: SharedService,
    private productUsageService: ProductUsageService

    ) {}

    ngOnInit(): void {
      this.initForm();
      this.loadDivisionNames();
    }
  

    loadDivisionNames() {
      this.productUsageService.getAllproduit().subscribe(
        (name: string[]) => {
          this.divisionNames = name;
        },
        (error) => {
          console.error('Error loading company names:', error);
        }
      );
    }
    
  initForm() {
    this.addform = new FormGroup({  
      dateDeTransposition: new FormControl(this.camp.dateDeTransposition),
      codeEntrepot: new FormControl(this.camp.codeEntrepot),
      unitesSaisies: new FormControl(this.camp.unitesSaisies),
    });

    
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
