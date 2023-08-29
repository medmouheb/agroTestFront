import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BeginningInventory } from '../../../models/beginninginventory.model';
import { SharedService } from 'app/modules/company/services/shared.service';
import { BeginninginventoryService } from 'app/modules/beginninginventory/services/beginninginventory.service';

@Component({
  selector: 'app-beginninginventory-details',
  templateUrl: './beginninginventory-details.component.html',
  styleUrls: ['./beginninginventory-details.component.scss']
})
export class BeginninginventoryDetailsComponent implements OnInit {

  
    @Input() camp!: BeginningInventory;

    @ViewChild("addform")
    addform: FormGroup;
   
    constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: BeginninginventoryService) { }
    codes: Array<String> = [];
    ngOnInit(): void {
      if (this.camp != null) {
        console.log("olll")
        this.sharedService.setIsActive(true);
        this.compaser.findAll().subscribe(data => {
          console.log("777::",data.map(el => { return el.codeProduit }))
          this.codes = data.map(el => { return el.nomDuProduit })
        })
      }; 
  
      if (this.camp == undefined) { this.camp = { nomDuProduit: "", codeProduit: "" } };
      this.initForm();
      console.log(this.addform);
    }
  
    initForm(
  
    ) {
      
  
  
  
      this.addform = this.fb.group({
        codeProduit: [
          null,
          [
            Validators.required,
  
            Validators.pattern(/^\d+$/),
            Validators.pattern(/^[a-zA-Z ]*$/),
          ],
        ],
        nomDuProduit: [
          null,
          Validators.required,
        ],
      });
  
    }
  
    minIstrueCode: boolean = false
  
    isBlur() {
  
      if (this.camp.codeProduit == undefined) {
        this.minIstrueCode = true
      }
      else if (this.camp.codeProduit.toString().length < 1) { this.minIstrueCode = true }
      else {
        this.minIstrueCode = false
      }
    }
    dispotrueCode: boolean = false
    dispotruename: boolean = false
    blur1() {
      if (this.camp.codeProduit == null) {
        this.dispotrueCode = false
  
      }
    }
    exist() {
      console.log(this.camp.codeProduit)
      this.compaser.findbycode(this.camp.codeProduit).subscribe(data => {
        console.log(data)
        if (data != null) {
          this.dispotrueCode = true
  
  
        } else {
          this.dispotrueCode = false
  
        }
  
      }, error => {
        console.log(error.status)
        if (error.status == 404) {
          this.dispotrueCode = false
  
        }
      })
  
    }
  
    exist1() {
      console.log(this.camp.codeProduit);
      this.compaser.findbyName(this.camp.codeProduit).subscribe(
        (data) => {
          console.log(data);
          if (data != null) {
            this.dispotruename = true;
          } else {
            this.dispotruename = false;
          }
        },
        (error) => {
          console.log(error.status);
          if (error.status == 404) {
            this.dispotruename = false;
          }
        }
      );
    }
    
    
  
   generateRandomCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }
  
    newSeggestions=""
  
    existname() {
      console.log("aa::",this.codes)
      if (this.codes.indexOf(this.camp.nomDuProduit) != -1) {
        this.dispotruename = true
       // this.newSeggestions= "chose "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()+" or "+this.camp.name+this.generateRandomCode()
  
      } else {
        this.dispotruename = false
  
      }
      
  
  
    }
  
    minIstrueName: boolean = false
    minIstrueName2: boolean = false
    // isBlur2() {
    //   console.log(this.minIstrueName2)
    //   console.log('===3:', this.fieldControl.value
    //   )
  
    //   if (this.fieldControl.status == "INVALID") {
    //     this.minIstrueName2 = true
  
    //   }
    //   else if (this.fieldControl.status == "VALID") {
    //     this.minIstrueName2 = false
  
    //   }
    // }
    // isBlur3() {
    //   if ((this.fieldControl.value == '') || (this.fieldControl.value == undefined)) {
    //     this.minIstrueName2 = false
  
    //   }
    // }
    isBlur1() {
      console.log(this.camp.nomDuProduit);
      if (
        this.camp.nomDuProduit === undefined ||
        this.camp.nomDuProduit.trim() === ""
      ) {
        this.minIstrueName = true;
      } else {
        this.minIstrueName = false;
      }
    }
    
    geValues(event) {
      
  
      if (
        this.dispotrueCode == false && this.dispotruename == false &&
        this.camp.codeProduit != null &&
        this.camp.codeProduit != "" &&
        this.camp.nomDuProduit != null &&
        this.camp.nomDuProduit != "" &&
        this.camp.codeProduit.toString().length >= 1 &&
        this.camp.nomDuProduit.toString().length >= 1
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
  
    get f() {
      return this.addform.controls;
    }
    minIphone: boolean = false
  

  
}
  