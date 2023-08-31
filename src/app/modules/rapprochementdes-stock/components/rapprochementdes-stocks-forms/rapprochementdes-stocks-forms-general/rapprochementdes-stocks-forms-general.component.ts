import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { RapprochementDesStocks } from 'app/modules/rapprochementdes-stock/model/rapprochementdes-stock';
import { RapprochementdesStockService } from 'app/modules/rapprochementdes-stock/service/rapprochementdes-stock.service';

@Component({
  selector: 'app-rapprochementdes-stocks-forms-general',
  templateUrl: './rapprochementdes-stocks-forms-general.component.html',
  styleUrls: ['./rapprochementdes-stocks-forms-general.component.scss']
})
export class RapprochementdesStocksFormsGeneralComponent implements OnInit {

  @Input() camp!: RapprochementDesStocks;

  @ViewChild("addform")
  addform: FormGroup;
 
  constructor(private sharedService: SharedService, private fb: FormBuilder, private compaser: RapprochementdesStockService) { }
  codes: Array<String> = [];
  ngOnInit(): void {
    if (this.camp != null) {
      console.log("olll")
      this.sharedService.setIsActive(true);
      this.compaser.findAll().subscribe(data => {
        console.log("777::",data.map(el => { return el.numeroDeLot }))
        this.codes = data.map(el => { return el.nDeReference })
      })
    }; 

    if (this.camp == undefined) { this.camp = { nDeReference: "", numeroDeLot: "" } };
    this.initForm();
    console.log(this.addform);
  }

  initForm(

  ) {
    



    this.addform = this.fb.group({
      numeroDeLot: [
        null,
        [
          Validators.required,

          Validators.pattern(/^\d+$/),
          Validators.pattern(/^[a-zA-Z ]*$/),
        ],
      ],
      nDeReference: [
        null,
        Validators.required,
      ],
    });

  }

  minIstrueCode: boolean = false

  isBlur() {

    if (this.camp.numeroDeLot == undefined) {
      this.minIstrueCode = true
    }
    else if (this.camp.numeroDeLot.toString().length < 1) { this.minIstrueCode = true }
    else {
      this.minIstrueCode = false
    }
  }
  dispotrueCode: boolean = false
  dispotruename: boolean = false
  blur1() {
    if (this.camp.numeroDeLot == null) {
      this.dispotrueCode = false

    }
  }
  exist() {
    console.log(this.camp.numeroDeLot)
    this.compaser.findbycode(this.camp.numeroDeLot).subscribe(data => {
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
    console.log(this.camp.nDeReference);
    this.compaser.findbyName(this.camp.nDeReference).subscribe(
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
    if (this.codes.indexOf(this.camp.nDeReference) != -1) {
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
    console.log(this.camp.nDeReference);
    if (
      this.camp.nDeReference === undefined ||
      this.camp.nDeReference.trim() === ""
    ) {
      this.minIstrueName = true;
    } else {
      this.minIstrueName = false;
    }
  }
  
  geValues(event) {
    

    if (
      this.dispotrueCode == false && this.dispotruename == false &&
      this.camp.numeroDeLot != null &&
      this.camp.numeroDeLot != "" &&
      this.camp.nDeReference != null &&
      this.camp.nDeReference != "" &&
      this.camp.numeroDeLot.toString().length >= 1 &&
      this.camp.nDeReference.toString().length >= 1
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
