import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { ProductUsage } from "../../model/product-usage";
import { Page, initPage } from "app/shared/models";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ProductUsageService } from "../../service/product-usage.service";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-product-usage-list",

  templateUrl: "./product-usage-list.component.html",
  styleUrls: ["./product-usage-list.component.scss"],
})
export class ProductUsageListComponent implements OnInit {
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
  camp: ProductUsage = {};
  companys: Array<ProductUsage> = [];
  companyss: Array<ProductUsage> = [];
  loading = false;
  companyPage: Page<ProductUsage> = initPage;
  companyPages: Page<ProductUsage> = initPage;

  isChecked: boolean = false;
  affiche: boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  fullDetail = false;

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation", "steps.details"];

  constructor(
    private productUsageService: ProductUsageService,
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
  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => {
      this.findPage();
      this.findArchivedPage();
    });
  }

  findPage() {
    this.loading = true;
    this.productUsageService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companys = result.content;
          this.companyPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error("aze", error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.productUsageService.findById(id).subscribe({
      next: (result) => (this.camp = result),
      error: (error) => console.error(error),
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 0;
    this.findPage();
    this.findArchivedPage();
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

    this.productUsageService.save(id, this.camp!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("ProductUsage"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("ProductUsage"),
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
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();
    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.add-ProductUsage",
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
        title: "menu.edit-ProductUsage",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.productUsageService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("ProductUsage"),
            }),
          );
        },
      });
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.affiche) {
      if (this.sortByCodeValid) {
        this.companyss.sort((a, b) =>
          a.codeProduit.localeCompare(b.codeProduit),
        );
        this.sortByCodeValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.codeProduit.localeCompare(a.codeProduit),
        );
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.companys.sort((a, b) =>
          a.codeProduit.localeCompare(b.codeProduit),
        );
        this.sortByCodeValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.codeProduit.localeCompare(a.codeProduit),
        );
        this.sortByCodeValid = true;
      }
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.affiche) {
      if (this.sortByNameValid) {
        this.companyss.sort((a, b) =>
          a.nomDuProduit.localeCompare(b.nomDuProduit),
        );
        this.sortByNameValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.nomDuProduit.localeCompare(a.nomDuProduit),
        );
        this.sortByNameValid = true;
      }
    } else {
      if (this.sortByNameValid) {
        this.companys.sort((a, b) =>
          a.nomDuProduit.localeCompare(b.nomDuProduit),
        );
        this.sortByNameValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.nomDuProduit.localeCompare(a.nomDuProduit),
        );
        this.sortByNameValid = true;
      }
    }
  }

  sortBynumeroDeLotValid: boolean = true;
  sortBsortBynumeroDeLotValid() {
    if (this.affiche) {
      if (this.sortBynumeroDeLotValid) {
        this.companyss.sort((a, b) =>
          a.numeroDeLot.localeCompare(b.numeroDeLot),
        );
        this.sortBynumeroDeLotValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.numeroDeLot.localeCompare(a.numeroDeLot),
        );
        this.sortBynumeroDeLotValid = true;
      }
    } else {
      if (this.sortBynumeroDeLotValid) {
        this.companys.sort((a, b) =>
          a.numeroDeLot.localeCompare(b.numeroDeLot),
        );
        this.sortBynumeroDeLotValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.numeroDeLot.localeCompare(a.numeroDeLot),
        );
        this.sortBynumeroDeLotValid = true;
      }
    }
  }

  sortByndeReferenceValid: boolean = true;
  sortByndeReference() {
    if (this.affiche) {
      if (this.sortByndeReferenceValid) {
        this.companyss.sort((a, b) =>
          a.ndeReference.localeCompare(b.ndeReference),
        );
        this.sortByndeReferenceValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.ndeReference.localeCompare(a.ndeReference),
        );
        this.sortByndeReferenceValid = true;
      }
    } else {
      if (this.sortByndeReferenceValid) {
        this.companys.sort((a, b) =>
          a.ndeReference.localeCompare(b.ndeReference),
        );
        this.sortByndeReferenceValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.ndeReference.localeCompare(a.ndeReference),
        );
        this.sortByndeReferenceValid = true;
      }
    }
  }

  onClickdisArchive(id: string) {
    this.productUsageService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("ProductUsage"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.productUsageService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("ProductUsage"),
          }),
        );
      },
    });
  }

  findArchivedPage() {
    this.loading = true;
    this.productUsageService
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
