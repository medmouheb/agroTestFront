import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { Drivers } from 'app/modules/drivers/models/drivers';
import { DriversService } from 'app/modules/drivers/services/drivers.service';

@Component({
  selector: 'app-drivers-unit-forms-general',
  templateUrl: './drivers-unit-forms-general.component.html',
  styleUrls: ['./drivers-unit-forms-general.component.scss']
})
export class DriversUnitFormsGeneralComponent implements OnInit {

  @Input() camp!: Drivers;

  @ViewChild("addform")
  addform: FormGroup;
 
  constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: DriversService) { }
  codes: Array<String> = [];
  ngOnInit(): void {
    if (this.camp != null) {
      
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe(data => {
        
        this.codes = data.map(el => { return el.nomDuChauffeur })
      })
    }; 

    if (this.camp == undefined) { this.camp = { nomDuChauffeur: "", codeEmploye: "" } };
    this.initForm();
    
  }

  initForm(

  ) {
    



    this.addform = this.fb.group({
      codeEmploye: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      nomDuChauffeur: [
        null,
        Validators.required,
      ],
    });

  }

  minIstrueCode: boolean = false

  isBlur() {

    if (this.camp.codeEmploye == undefined) {
      this.minIstrueCode = true
    }
    else if (this.camp.codeEmploye.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.camp.codeEmploye == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    
    this.compaser.findbycode(this.camp.codeEmploye).subscribe(data => {
      
      if (data != null) {
        this.dispotrueCode = true


      } else {
        this.dispotrueCode = false

      }

    }, error => {
      
      if (error.status == 404) {
        this.dispotrueCode = false

      }
    })

  }

  exist1() {
    
    this.compaser.findbyName(this.camp.codeEmploye).subscribe(
      (data) => {
        
        if (data != null) {
          this.dispotruename = true;
        } else {
          this.dispotruename = false;
        }
      },
      (error) => {
        
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
    
    if (this.codes.indexOf(this.camp.nomDuChauffeur) != -1) {
      this.dispotruename = true


    } else {
      this.dispotruename = false

    }
    


  }

  minIstrueName: boolean = false
  minIstrueName2: boolean = false




















  isBlur1() {
    
    if (
      this.camp.nomDuChauffeur === undefined ||
      this.camp.nomDuChauffeur.trim() === ""
    ) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }
  
  geValues(event) {
    

    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      this.camp.codeEmploye != null &&
      this.camp.codeEmploye != "" &&
      this.camp.nomDuChauffeur != null &&
      this.camp.nomDuChauffeur != "" &&
      this.camp.codeEmploye.toString().length >= 1 &&
      this.camp.nomDuChauffeur.toString().length >= 1
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
