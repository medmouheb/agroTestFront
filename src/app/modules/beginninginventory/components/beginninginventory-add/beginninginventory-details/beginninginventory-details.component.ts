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
  campReplica!: BeginningInventory;

    @ViewChild("addform")
    addform: FormGroup;
   
    constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: BeginninginventoryService) { }
    codes: Array<String> = [];
    names: Array<String> = [];
    static = ""

    ngOnInit(): void {
      if (this.camp != null) {
        
        this.sharedService.setIsActive(true);
        this.compaser.findAll().subscribe(data => {
          this.codes = data.map(el => { return el.codeProduit }
            )
            this.names = data.map(el => {
              return el.nomDuProduit
            })
        })
      }; 
  
      if (this.camp == undefined) { this.camp = { nomDuProduit: "", codeProduit: "" } };
      this.initForm();
      

      if (this.camp.id) {
        this.static = "update"
        this.campReplica =  JSON.parse( JSON.stringify(  this.camp))
      } else if (!this.camp.id) {
        this.static = "create"
      }
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
      if (this.codes.indexOf((this.camp.codeProduit + "")) != -1) {
        if(this.static=="update" ){
          if(this.camp.codeProduit == this.campReplica.codeProduit){
            this.dispotrueCode = false
          }else{
            this.dispotrueCode = true
          }
        }else{
          this.dispotrueCode = true
        }
  
      } else {
        this.dispotrueCode = false
      }
  
    }
  
    exist1() {
      if (this.names.indexOf(this.camp.nomDuProduit) != -1) {
        if(this.static=="update" ){
          if(this.camp.nomDuProduit == this.campReplica.nomDuProduit){
            this.dispotruename = false
          }else{
            this.dispotruename = true
          }
        }else{
          this.dispotruename = true
        }
      } else {
        this.dispotruename = false
      }
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
      
      if (this.codes.indexOf(this.camp.nomDuProduit) != -1) {
        this.dispotruename = true

  
      } else {
        this.dispotruename = false
  
      }
      
  
  
    }
  

    codeIsvalid = false

    validationCode() {
      const codeRegex: RegExp =/^[a-zA-Z0-9]*$/;
      
      if (codeRegex.test(this.camp.codeProduit)) {
        this.codeIsvalid = false;
      
    
      }
      else {
      this.codeIsvalid=true
      }
    
    }

    minIstrueName: boolean = false
    minIstrueName2: boolean = false




  


  



  





  


    isBlur1() {
      
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
         !this.codeIsvalid&&  this.dispotrueCode == false && this.dispotruename == false &&
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
  