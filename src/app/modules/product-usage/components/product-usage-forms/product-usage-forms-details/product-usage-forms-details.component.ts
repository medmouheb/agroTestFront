import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { ProductUsage } from 'app/modules/product-usage/model/product-usage';
import { ProductUsageService } from 'app/modules/product-usage/service/product-usage.service';

@Component({
  selector: 'app-product-usage-forms-details',
  templateUrl: './product-usage-forms-details.component.html',
  styleUrls: ['./product-usage-forms-details.component.scss']
})
export class ProductUsageFormsDetailsComponent implements OnInit {

 
 
  @Input() camp!: ProductUsage;
  addform: FormGroup;

  divisionNames: string[] = [];
  selectedDivisionName: string = '';
  productName: string;




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
    onCodeSelect() {
      const selectedCode = this.addform.get('codeProduit').value;

      if (this.camp.codeProduit) {
        this.productUsageService.findProduitName(this.camp.codeProduit).subscribe(
          (productName: any) => {

            this.productName = productName; // Display the product name in the input field
            this.addform.get('nomDuProduit').setValue(productName);
          },
          (error) => {
            console.error('Error loading product name:', error.error.text);
            this.productName = error.error.text;
            this.camp.nomDuProduit=error.error.text
            this.addform.get('nomDuProduit').
            setValue(error.error.text);

          }
        );
      } else {
        this.productName = ''; // Reset product name if no code is selected
        this.addform.get('nomDuProduit').setValue('');  
      }
    }

  initForm() {
    this.addform = new FormGroup({  
    codeProduit: new FormControl(this.camp.codeProduit),
    nomDuProduit: new FormControl( this.camp.nomDuProduit),
    transCode: new FormControl(this.camp.transCode),
    typeDeProduit: new FormControl(this.camp.typeDeProduit),
    quantite: new FormControl(this.camp.quantite),
    montant: new FormControl(this.camp.montant),
    commentaire: new FormControl(this.camp.commentaire),
    location: new FormControl(this.camp.location),
    void: new FormControl(this.camp.void)
    });
    
  }

  setVoid(){
    this.camp.void=!this.camp.void
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
