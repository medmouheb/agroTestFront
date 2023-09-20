import { Component, Input, OnInit } from '@angular/core';
import { Division } from '../../../models/division';
import { SharedService } from 'app/modules/company/services/shared.service';
import { WillayaService } from 'app/modules/willaya/services/willaya.service';
import { Willaya } from 'app/modules/willaya/models/willaya';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from 'app/modules/company/models/comany';
import { CompanyService } from 'app/modules/company/services/company.service';
import { DivisionService } from 'app/modules/division/services/division.service';

@Component({
  selector: 'app-division-from-localisation',
  templateUrl: './division-from-localisation.component.html',
  styleUrls: ['./division-from-localisation.component.scss']
})
export class DivisionFromLocalisationComponent implements OnInit {
  wilayas: Array<Willaya> = []
  companys: Array<Company> = [];
  divisions: Array<Division> = [];
  addform: FormGroup;
  companyname: any
  @Input() division!: Division
  constructor(private sharedService: SharedService, private companyService: CompanyService,
    private FormBuilder: FormBuilder,
    private divisionService: DivisionService,
    private wilayaservice: WillayaService) { }

  ngOnInit(): void {
    // if (localStorage.getItem("company")) {
    //   this.isRemenber = true
    //   // this.division.companyname=JSON.parse(  localStorage.getItem("company")).companyname
    //   // this.division.companycode=JSON.parse(  localStorage.getItem("company")).codecompany
    // }
    this.getAllWillaya()
    this.getAllCompany()
    setTimeout(() => {
    this.wil = {...this.companys.filter(el => {return el.name == this.division.companyname})[0]}
    }, 500);
    

    
    
    // setTimeout(()=>{
    //   this.wil = {
    //     ...this.companys.filter(el => {
    //       //console.log(el)
    //       return el.name == this.division.companyname
  
    //     })[0]
    //   }
    //   this.division = { ...this.wil, phone: this.wil.number, codeCity: this.wil.cityCode, nameCity: this.wil.cityName, companyname: this.wil.name }
    //   this.isRemenber=true

    // },500)
    
    
  }
  isRemenber = true
  getAllWillaya() {
    this.wilayaservice.findAll().subscribe({
      next: (result) => { this.wilayas = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }
  setCompany() {
    this.isRemenber = !this.isRemenber
    console.log("rrr::",this.wil)

    if (this.isRemenber ) {

      this.division.address=this.wil.address
      this.division.codeCity=this.wil.cityCode
      this.division.nameCity=this.wil.cityName
      this.division.wilayaCode=this.wil.wilayaCode
      this.division.wilayaName=this.wil.wilayaName
      this.division.zipCode=this.wil.zipCode
      this.division.email=this.wil.email
      this.division.phone=this.wil.number

    } else {

      this.division.address=""
      this.division.codeCity=""
      this.division.nameCity=""
      this.division.wilayaCode=""
      this.division.wilayaName=""
      this.division.zipCode=""
      this.division.email=""
      this.division.phone=""

    }
  }
  selectValue(e: any) {
    let wil = this.wilayas.filter(el => {
      return el.code == e.target.value

    })[0]
    this.division.wilayaName = wil.name
    this.division.wilayaCode = wil.code

  }
  minIphone: boolean = false
  isBlur3() {
    if ((this.division.phone.toString().length < 12) || (this.division.phone.toString().length > 13)) {
      this.minIphone = true;
    } else {
      this.minIphone = false;
    }
  }

  getAlldivision() {
    this.divisionService.findAll().subscribe({
      next: (result) => { this.divisions = result; console.log("2==", result) },
      error: (error) => console.error(error),
    });
  }

  getAllCompany() {
    this.companyService.findAll().subscribe({
      next: (result) => (this.companys = result),
      error: (error) => console.error(error),
    });
  }

  // onCompanyChange() {
  //   console.log(this.division.campany!.id)

  //   if (this.division.campany!.id) {
  //     this.division.companyname = this.companys.find(
  //       (elem) => elem.id === this.division.companyname

  //     );
  //     console.log(this.division.campany)
  //   }
  // }
  wil: any
  selectValue1(e: any) {
    this.wil = {...this.companys.filter(el => {return el.name == e.target.value})[0]}



    console.log("88::", this.division)
    console.log("88::9", this.wil)
    if (this.isRemenber) {
      this.division.companyname = e.target.value
      this.division.address=this.wil.address
      this.division.codeCity=this.wil.cityCode
      this.division.nameCity=this.wil.cityName
      this.division.wilayaCode=this.wil.wilayaCode
      this.division.wilayaName=this.wil.wilayaName
      this.division.zipCode=this.wil.zipCode
      this.division.email=this.wil.email


      this.division.phone=this.wil.number

    }else{

      this.division.companyname = e.target.value
    }




  }
  emailIsvalid = false

validationEmail() {
  const emailRegex: RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  console.log(this.division.email)
  if (emailRegex.test(this.division.email)) {
    this.emailIsvalid = false;
  console.log(this.division.email)

  }
  else {
  this.emailIsvalid=true
  }

}
}
