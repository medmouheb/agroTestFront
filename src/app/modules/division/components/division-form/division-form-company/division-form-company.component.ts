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

  ngOnInit(): void {
    this.addform=this.FormBuilder.group({
      idcamp:['',Validators.required]
      
    })
    // if (!this.division.campany) {
    //   this.division.campany = {};
    // }
    this.getAllCompany();
  }

  getAlldivision(){
    this.divisionService.findAll().subscribe({
      next: (result) => {this.divisions = result;console.log("2==",result)},
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
  selectValue(e:any){

    let wil=this.companys.filter(el=>{
      //console.log(el)
      return el.name==e.target.value
  
    })[0].code
    console.log(wil)

    this.division.companycode=wil
    console.log(this.division.companyname)
    console.log(this.division.companycode)
    this.companyname=wil

    

  }
}
