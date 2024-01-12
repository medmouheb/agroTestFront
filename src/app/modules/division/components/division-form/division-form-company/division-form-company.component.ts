import { Component, Input, OnInit } from "@angular/core";
import { Division } from "../../../models/division";
import { CompanyService } from "app/modules/company/services/company.service";
import { Company } from "app/modules/company/models/comany";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "app/modules/company/services/shared.service";
import { DivisionService } from "app/modules/division/services/division.service";

@Component({
  selector: "app-division-form-company",
  templateUrl: "./division-form-company.component.html",
  styleUrls: ["./division-form-company.component.scss"],
})
export class DivisionFormCompanyComponent implements OnInit {
  @Input() division: Division = {};
  companys: Array<Company> = [];
  divisions:Array<Division> = [];
  addform: FormGroup;
  companyname:any
  constructor(
    private sharedService: SharedService,
    private companyService: CompanyService,
    private FormBuilder:FormBuilder,
    private divisionService:DivisionService
  ) {}
    isRemenber=false
  ngOnInit(): void {
    if(localStorage.getItem("company")){
      this.isRemenber=true
      this.division.companyname=JSON.parse(  localStorage.getItem("company")).companyname
      this.division.companycode=JSON.parse(  localStorage.getItem("company")).codecompany
    }
    this.addform=this.FormBuilder.group({
      idcamp:['',Validators.required]

    })
    // if (!this.division.campany) {
    //   this.division.campany = {};
    // }
    this.getAllCompany();
  }

  setCompany(){
    this.isRemenber=!this.isRemenber
    if(this.isRemenber==false){
      localStorage.setItem("company","")
    }else{
      localStorage.setItem("company", JSON.stringify({companyname:this.division.companyname,codecompany:this.companyname}) )
    }
  }

  getAlldivision(){
    this.divisionService.findAll().subscribe({
      next: (result) => {this.divisions = result;},
      error: (error) => console.error(error),
    });
    this.getAllCompany();
  }

  getAllCompany() {
    this.companyService.findAll().subscribe({
      next: (result) => (this.companys = result),
      error: (error) => console.error(error),
    });
  }


  selectValue(e:any){

    let wil=this.companys.filter(el=>{
      return el.name==e.target.value

    })[0].code

    this.division.companycode=wil
    this.companyname=wil



  }
}
