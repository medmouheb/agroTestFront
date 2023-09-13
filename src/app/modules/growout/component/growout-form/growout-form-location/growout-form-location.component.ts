import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { Growout } from "app/modules/growout/models/growout";
import { Willaya } from "app/modules/willaya/models/willaya";
import { WillayaService } from "app/modules/willaya/services/willaya.service";

@Component({
  selector: "app-growout-form-location",
  templateUrl: "./growout-form-location.component.html",
  styleUrls: ["./growout-form-location.component.scss"],
})
export class GrowoutFormLocationComponent implements OnInit {
  @Input() growout!: Growout;
  @ViewChild("myForm") myForm: NgForm;

  formData = { 
    phone: "",
    email: "",

    // autres champs de formulaire
  };

  currentStep = 2;
  wilayas:Array<Willaya>=[]

  constructor(private sharedService: SharedService,
    private wilayaservice:WillayaService) {}

    ngOnInit(): void {
      this.getAllWillaya()
        }
      
  getAllWillaya(){
    this.wilayaservice.findAll().subscribe({
      next: (result) => { this.wilayas = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }
  selectValue(e:any){
    let wil=this.wilayas.filter(el=>{
      return el.code==e.target.value
  
    })[0].name
    this.growout.wilayaName=wil
  
  }
  onNextStep() {
    // validation du formulaire pour l'étape actuelle
    if (this.myForm.valid) {
      this.currentStep++;
    } else {
      // afficher des messages d'erreur ou autre traitement
      console.log("Veuillez remplir tous les champs obligatoires.");
    }
  }

  onPreviousStep() {
    this.currentStep--;
  }
  minIwillaya: boolean = false

  isBlur() {
    if ((this.growout.wilayaName.toString().length <=0 )|| (this.growout.wilayaName.toString().length > 100)) {
      this.minIwillaya = true;
    } else {
      this.minIwillaya = false;
    }
  }
  minIwillayacode: boolean = false

  isBlur2() {
    if ((this.growout.wilayaCode.toString().length <=0 )|| (this.growout.wilayaCode.toString().length > 3)) {
      this.minIwillayacode = true;
    } else {
      this.minIwillayacode = false;
    }
  }

  emailIsvalid = false

validationEmail() {
  const emailRegex: RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  console.log(this.growout.email)
  if (emailRegex.test(this.growout.email)) {
    this.emailIsvalid = false;
  console.log(this.growout.email)

  }
  else {
  this.emailIsvalid=true
  }

}



  isBlur3() {
    if ((this.growout.phoneNumber.toString().length <12 )|| (this.growout.phoneNumber.toString().length > 13)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }  minIphone: boolean = false
}
