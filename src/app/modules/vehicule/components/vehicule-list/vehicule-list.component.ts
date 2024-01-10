import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Vehicule } from "../../models/vehicule";
import { Page, initPage } from "app/shared/models";
import { FormBuilder, FormGroup } from "@angular/forms";
import { VehiculeService } from "../../Services/vehicule.service";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-vehicule-list",
  templateUrl: "./vehicule-list.component.html",
  styleUrls: ["./vehicule-list.component.scss"],
})
export class VehiculeListComponent implements OnInit {
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
  camp: Vehicule = {};
  companys: Array<Vehicule> = [];
  companyss: Array<Vehicule> = [];
  loading = false;
  companyPage: Page<Vehicule> = initPage;
  companyPages: Page<Vehicule> = initPage;

  isChecked: boolean = false;
  affiche: boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  fullDetail = false;

  currentStep = 0;
  steps: any = [
    "steps.general",
    "steps.localisation",
    "steps.facility-details",
    "steps.bin-details",
  ];

  constructor(
    private vehiculeService: VehiculeService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
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
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.vehiculeService
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
  findArchivedPage() {
    this.loading = true;
    this.vehiculeService
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

  findById(id: string) {
    this.vehiculeService.findById(id).subscribe({
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

    this.vehiculeService.save(id, this.camp!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("vehicule"),
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
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();
    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.add-Vehicles",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(null),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
      this.sharedService.setIsActive(false);
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
        title: "menu.edit-Vehicles",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
      this.sharedService.setIsActive(true);
    }, 200);
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.vehiculeService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("vehicule"),
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
          a.vehiculeCode.localeCompare(b.vehiculeCode),
        );
        this.sortByCodeValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.vehiculeCode.localeCompare(a.vehiculeCode),
        );
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.companys.sort((a, b) =>
          a.vehiculeCode.localeCompare(b.vehiculeCode),
        );
        this.sortByCodeValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.vehiculeCode.localeCompare(a.vehiculeCode),
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
          a.vehiculeName.localeCompare(b.vehiculeName),
        );
        this.sortByNameValid = false;
      } else {
        this.companyss.sort((a, b) =>
          b.vehiculeName.localeCompare(a.vehiculeName),
        );
        this.sortByNameValid = true;
      }
    } else {
      if (this.sortByNameValid) {
        this.companys.sort((a, b) =>
          a.vehiculeName.localeCompare(b.vehiculeName),
        );
        this.sortByNameValid = false;
      } else {
        this.companys.sort((a, b) =>
          b.vehiculeName.localeCompare(a.vehiculeName),
        );
        this.sortByNameValid = true;
      }
    }
  }

  onClickdisArchive(id: string) {
    this.vehiculeService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("vehicule"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.vehiculeService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("vehicule"),
          }),
        );
      },
    });
  }
}
