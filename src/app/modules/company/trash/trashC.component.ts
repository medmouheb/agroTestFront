import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { Page, initPage } from "app/shared/models";
import { CompanyService } from "../services/company.service";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Company } from "../models/comany";
import { Router } from "@angular/router";


@Component({
  selector: "app-trash",
  templateUrl: "./trashC.component.html",
  styleUrls: ["./trashC.component.scss"],
})
export class TrashCComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("disarchiveModal")
  disarchiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading? = false;
  pageNumber = 0;
  pageSize = 10;
  filter = "";

  company: Company = {};
  companys: Array<Company> = [];
  Page: Page<Company> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private companyService: CompanyService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.companyService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companys = result.content;
          this.Page = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }
  goto(){
    this.router.navigateByUrl("/company")
  }

  findById(id: string) {
    this.companyService.findById(id).subscribe({
      next: (result) => (this.company = result),
      error: (error) => console.error(error),
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  onPageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.onPaginationChange.emit("");
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  onClickdisArchive(id: string) {

    this.companyService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("company"),
          })
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.companyService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("company"),
          })
        );
      },
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.companys.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.companys.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.companys.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.companys.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }


  sortByCityNameValid: boolean = true;
  sortByCityName() {
    if (this.sortByCityNameValid) {
      this.companys.sort((a, b) => (a.cityName || "").localeCompare((b.cityName || "")));
      this.sortByCityNameValid = false
    } else {
      this.companys.sort((a, b) => (b.cityName || "").localeCompare((a.cityName || "")));
      this.sortByCityNameValid = true
    }
  }
  sortBywillayaValid: boolean = true;
  sortBywillaya() {
    if (this.sortBywillayaValid) {
      this.companys.sort((a, b) => (a.wilayaName || "").localeCompare((b.wilayaName || "")));
      this.sortBywillayaValid = false
    } else {
      this.companys.sort((a, b) => (b.wilayaName || "").localeCompare((a.wilayaName || "")));
      this.sortBywillayaValid = true
    }
  }


  sortByAddressValid: boolean = true;
  sortByAddress() {
    if (this.sortByAddressValid) {
      this.companys.sort((a, b) => (a.address || "").localeCompare((b.address || "")));
      this.sortByAddressValid = false
    } else {
      this.companys.sort((a, b) => (b.address || "").localeCompare((a.address || "")));
      this.sortByAddressValid = true
    }
  }

  sortByEmailValid: boolean = true;
  sortByEmail() {
    if (this.sortByEmailValid) {
      this.companys.sort((a, b) => (a.email || "").localeCompare((b.email || "")));
      this.sortByEmailValid = false
    } else {
      this.companys.sort((a, b) => (b.email || "").localeCompare((a.email || "")));
      this.sortByEmailValid = true
    }
  }
  sortByPhoneValid: boolean = true;
  sortByphone() {
    if (this.sortByPhoneValid) {
      this.companys.sort((a, b) => (a.number || "").localeCompare((b.number || "")));
      this.sortByPhoneValid = false
    } else {
      this.companys.sort((a, b) => (b.number || "").localeCompare((a.number || "")));
      this.sortByPhoneValid = true
    }
  }
}
