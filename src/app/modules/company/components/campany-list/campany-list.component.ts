import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Company } from "../../models/comany";
import { Page, initPage } from "app/shared/models";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";
import { CompanyService } from "../../services/company.service";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-campany-list",
  templateUrl: "./campany-list.component.html",
  styleUrls: ["./campany-list.component.scss"],
})
export class CampanyListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  camp: Company = {};
  companys: Array<Company> = [];
  companyss: Array<Company> = [];
  loading = false;
  companyPage: Page<Company> = initPage;
  companyPages: Page<Company> = initPage;

  isChecked: boolean = false;
  affiche: boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor(
    private companyService: CompanyService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private formBuilder: FormBuilder,
  ) {}
  onCheckboxChange() {
    if (this.isChecked == false) {
      this.affiche = false;
    } else {
      this.affiche = true;
    }
  }

  isAdmin: boolean = false;

  isCheckedFull: false;
  ngOnInit(): void {
    // if(JSON.parse(localStorage.getItem("tocken")).roles[0]=="ROLE_ADMIN" ){
    //   this.isAdmin=true
    // }
    this.findPage();
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => {
      this.findPage();
      this.findArchivedPage();
    });
  }

  findPage() {
    this.loading = true;
    this.companyService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companys = result.content;
          this.companyPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.companyService.findById(id).subscribe({
      next: (result) => (this.camp = result),
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

  onCancel() {
    this.camp = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      },
    );

    this.companyService.save(id, this.camp!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("company"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("company"),
          }),
        );
      },
    });
  }

  onWizardSave(id: string | null) {
    if (this.stepper.lastStep()) {
      this.onSave(id);
      return;
    }
    this.stepper.nextStep();
  }

  onStepChange(step: number) {
    this.currentStep = step;
  }

  onClickAdd() {
    this.camp = {};
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();
    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.add-company",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(null),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);
  }

  onClickEdit(id: string) {
    this.findById(id);

    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();
    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.edit-company",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.companyService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("company"),
            }),
          );
        },
      });
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.affiche == true) {
      if (this.sortByCodeValid) {
        this.companyss.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.companyss.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.companys.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.companys.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.affiche == true) {
      if (this.sortByNameValid) {
        this.companyss.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.companyss.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    } else {
      if (this.sortByNameValid) {
        this.companys.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.companys.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    }
  }

  sortByCityNameValid: boolean = true;
  sortByCityName() {
    if (this.affiche == true) {
      if (this.sortByCityNameValid) {
        this.companyss.sort((a, b) =>
          (a.cityName || "").localeCompare(b.cityName || ""),
        );
        this.sortByCityNameValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.cityName || "").localeCompare(a.cityName || ""),
        );
        this.sortByCityNameValid = true;
      }
    } else {
      if (this.sortByCityNameValid) {
        this.companys.sort((a, b) =>
          (a.cityName || "").localeCompare(b.cityName || ""),
        );
        this.sortByCityNameValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.cityName || "").localeCompare(a.cityName || ""),
        );
        this.sortByCityNameValid = true;
      }
    }
  }

  sortByAddressValid: boolean = true;
  sortByAddress() {
    if (this.affiche == true) {
      if (this.sortByAddressValid) {
        this.companyss.sort((a, b) =>
          (a.address || "").localeCompare(b.address || ""),
        );
        this.sortByAddressValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.address || "").localeCompare(a.address || ""),
        );
        this.sortByAddressValid = true;
      }
    } else {
      if (this.sortByAddressValid) {
        this.companys.sort((a, b) =>
          (a.address || "").localeCompare(b.address || ""),
        );
        this.sortByAddressValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.address || "").localeCompare(a.address || ""),
        );
        this.sortByAddressValid = true;
      }
    }
  }

  sortBycityCodeValid: boolean = true;
  sortBycityCode() {
    if (this.affiche == true) {
      if (this.sortBycityCodeValid) {
        this.companyss.sort((a, b) =>
          (a.cityCode || "").localeCompare(b.cityCode || ""),
        );
        this.sortBycityCodeValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.cityCode || "").localeCompare(a.cityCode || ""),
        );
        this.sortBycityCodeValid = true;
      }
    } else {
      if (this.sortBycityCodeValid) {
        this.companys.sort((a, b) =>
          (a.cityCode || "").localeCompare(b.cityCode || ""),
        );
        this.sortBycityCodeValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.cityCode || "").localeCompare(a.cityCode || ""),
        );
        this.sortBycityCodeValid = true;
      }
    }
  }

  sortByusernameValid: boolean = true;
  sortByusername() {
    if (this.affiche == true) {
      if (this.sortByusernameValid) {
        this.companyss.sort((a, b) =>
          (a.username || "").localeCompare(b.username || ""),
        );
        this.sortByusernameValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.username || "").localeCompare(a.username || ""),
        );
        this.sortByusernameValid = true;
      }
    } else {
      if (this.sortByusernameValid) {
        this.companys.sort((a, b) =>
          (a.username || "").localeCompare(b.username || ""),
        );
        this.sortByusernameValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.username || "").localeCompare(a.username || ""),
        );
        this.sortByusernameValid = true;
      }
    }
  }

  sortByEmailValid: boolean = true;
  sortByEmail() {
    if (this.affiche == true) {
      if (this.sortByEmailValid) {
        this.companyss.sort((a, b) =>
          (a.email || "").localeCompare(b.email || ""),
        );
        this.sortByEmailValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.email || "").localeCompare(a.email || ""),
        );
        this.sortByEmailValid = true;
      }
    } else {
      if (this.sortByEmailValid) {
        this.companys.sort((a, b) =>
          (a.email || "").localeCompare(b.email || ""),
        );
        this.sortByEmailValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.email || "").localeCompare(a.email || ""),
        );
        this.sortByEmailValid = true;
      }
    }
  }
  sortByPhoneValid: boolean = true;
  sortByphone() {
    if (this.affiche == true) {
      if (this.sortByPhoneValid) {
        this.companyss.sort((a, b) =>
          (a.number || "").localeCompare(b.number || ""),
        );
        this.sortByPhoneValid = false;
      } else {
        this.companyss.sort((a, b) =>
          (b.number || "").localeCompare(a.number || ""),
        );
        this.sortByPhoneValid = true;
      }
    } else {
      if (this.sortByPhoneValid) {
        this.companys.sort((a, b) =>
          (a.number || "").localeCompare(b.number || ""),
        );
        this.sortByPhoneValid = false;
      } else {
        this.companys.sort((a, b) =>
          (b.number || "").localeCompare(a.number || ""),
        );
        this.sortByPhoneValid = true;
      }
    }
  }

  onClickdisArchive(id: string) {
    this.companyService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("company"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.companyService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("company"),
          }),
        );
      },
    });
  }

  findArchivedPage() {
    this.loading = true;
    this.companyService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companyss = result.content;
          this.companyPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }
}
