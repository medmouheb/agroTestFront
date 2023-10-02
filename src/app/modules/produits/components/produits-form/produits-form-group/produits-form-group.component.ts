import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Fournisseur } from 'app/modules/fournisseurs/models/fournisseur.model';
import { FournisseursService } from 'app/modules/fournisseurs/services/fournisseurs.service';
import { Produit } from '../../../models/produit.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { ProduitsService } from 'app/modules/produits/services/produits.service';

@Component({
  selector: 'app-produits-form-group',
  templateUrl: './produits-form-group.component.html',
  styleUrls: ['./produits-form-group.component.scss']
})
export class ProduitsFormGroupComponent implements OnInit {
  @ViewChild("addform")
  addform: FormGroup;
  @Input() produit: Produit = {}
  vendors: Array<Fournisseur> = []

  constructor(private produitser:ProduitsService,
    private fournisseursService: FournisseursService,private sharedService: SharedService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    if(!this.produit.fournisseur){
      this.produit.fournisseur = {}
    }
    this.getAllVendors()
  }
  initForm() {
    this.addform = this.fb.group({
      code: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
          Validators.pattern(/^\d+$/),
        ],
      ],
      name: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(8)],
      ],
      tauxTva:[null],
      prixUnitaireHt:[null],
      maxdepasse:[null],
      fabricant:[null],
      couleur:[null],
      inventaire:[null],
      medicamenteux:[null],
      status:[null],
      category:[null],
      currency:[null],
      vendor:[null],
      type:[null],
    });

  }
  getAllVendors(){
    this.fournisseursService.findAll().subscribe({
      next: result => this.vendors = result,
      error: error => console.error(error)
    })
  }

  onVendorChange(e:any){
    console.log(this.vendors.find(elem => elem.id === e.target.value))
    
      this.produit.fournisseur = this.vendors.find(elem => elem.id === e.target.value)
  }
  minIstrueCode: boolean = false
  isBlur() {

    if (this.produit.code.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }
  dispotruename=false
  existname() {
    console.log(this.produit.code)
    this.produitser.findbyName(this.produit.name).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotruename = true
        this.sharedService.setIsActive(false);



      } else {
        this.dispotruename = false
        this.sharedService.setIsActive(true);


      }

    }, error => {
      console.log(error.status)
      if (error.status == 404) {
        this.dispotrueCode = false
        this.sharedService.setIsActive(false);


      }
    })

  }
  
  dispotrueCode = false
  exist() {
    console.log(this.produit.code)
    this.produitser.findbycode(this.produit.code).subscribe(data => {
      console.log(data)
      if (data != null) {
        this.dispotrueCode = true
        this.sharedService.setIsActive(false);


      } else {
        this.dispotrueCode = false
        this.sharedService.setIsActive(true);


      }

    }, error => {
      console.log(error.status)
      if (error.status == 404) {
        this.dispotrueCode = false
        this.sharedService.setIsActive(false);


      }
    })

  }
  









  minIstrueName: boolean = false
  isBlur1() {

    if (this.produit.name.toString().length < 3) { this.minIstrueName = true }
    else {
      this.minIstrueName = false
    }
  }
  geValues(event) {

    if (
      this.produit.code != null &&
      this.produit.code != "" &&
      this.produit.name != null &&
      this.produit.name != "" &&
      this.produit.code.toString().length >= 1 &&this.dispotrueCode==false&& this.dispotruename==false&&
      this.produit.name.toString().length >= 3
    ) {
      this.sharedService.setIsActive(true);
    } else {
      this.sharedService.setIsActive(false);
    }
  }

  isControlValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  isControlInValid(controlName: string): boolean {
    const control = this.addform.controls[controlName];
    return (
      control.invalid && (control.dirty || control.touched || control.invalid)
    );
  }

  
  codeIsvalid = false

validationCode() {
  const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
  console.log(this.produit.code)
  if (codeRegex.test(this.produit.code)) {
    this.codeIsvalid = false;
  console.log(this.produit.code)

  }
  else {
  this.codeIsvalid=true
  }

}

  get f() {
    return this.addform.controls;
  }
}
