import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { Division } from "../../models/division";
import { DivisionService } from "../../services/division.service";

@Component({
  selector: "app-division-list",
  templateUrl: "./division-list.component.html",
  styleUrls: ["./division-list.component.scss"],
})
export class DivisionListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  isChecked: boolean = false;
  affiche: boolean = false;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  division: Division = {};
  divisions: Array<Division> = [];
  divisionss: Array<Division> = [];
  loading = false;
  divisionPage: Page<Division> = initPage;
  divisionPages: Page<Division> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor(
    private divisionService: DivisionService,
    private translateService: TranslateService,
    private toastService: HotToastService,
  ) {}
  onCheckboxChange() {
    if (this.isChecked == false) {
      this.affiche = false;
    } else {
      this.affiche = true;
    }
  }
  ngOnInit(): void {
    this.divisionService.findAll().subscribe((divisions) => {
      this.divisions = divisions;
    });
    this.findPage();
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => {
      this.findPage();
      this.findArchivedPage();
    });
  }

  findPage() {
    this.loading = true;
    this.divisionService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.divisions = result.content;
          this.divisionPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.divisionService.findById(id).subscribe({
      next: (result) => {
        this.division = result;
      },
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
    this.division = {};
    this.currentStep = 0;
  }
  estObjetVide(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      },
    );

    this.divisionService.save(id, this.division!).subscribe({
      next: (data) => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("division"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("division"),
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
    this.formModal.show({
      title: "menu.add-division",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();
    }, 100);
    this.findById(id);

    this.formModal.show({
      title: "menu.edit-division",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.divisionService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("division"),
            }),
          );
        },
      });
    });
  }
  sortBySpiecValid: boolean = true;
  sortBySpiec() {
    if (this.affiche == true) {
      if (this.sortBySpiecValid) {
        this.divisionss.sort((a, b) =>
          a.speciesType.localeCompare(b.speciesType),
        );
        this.sortBySpiecValid = false;
      } else {
        this.divisionss.sort((a, b) =>
          b.speciesType.localeCompare(a.speciesType),
        );
        this.sortBySpiecValid = true;
      }
    } else {
      if (this.sortBySpiecValid) {
        this.divisions.sort((a, b) =>
          a.speciesType.localeCompare(b.speciesType),
        );
        this.sortBySpiecValid = false;
      } else {
        this.divisions.sort((a, b) =>
          b.speciesType.localeCompare(a.speciesType),
        );
        this.sortBySpiecValid = true;
      }
    }
  }
  sortBycompValid: boolean = true;
  sortBycomp() {
    if (this.affiche == true) {
      if (this.sortBycompValid) {
        this.divisionss.sort((a, b) =>
          a.companyname.localeCompare(b.companyname),
        );
        this.sortBycompValid = false;
      } else {
        this.divisionss.sort((a, b) =>
          b.companyname.localeCompare(a.companyname),
        );
        this.sortBycompValid = true;
      }
    } else {
      if (this.sortBycompValid) {
        this.divisions.sort((a, b) =>
          a.companyname.localeCompare(b.companyname),
        );
        this.sortBycompValid = false;
      } else {
        this.divisions.sort((a, b) =>
          b.companyname.localeCompare(a.companyname),
        );
        this.sortBycompValid = true;
      }
    }
  }
  sortBycurreValid: boolean = true;
  sortBycurre() {
    if (this.affiche == true) {
      if (this.sortBycurreValid) {
        this.divisionss.sort((a, b) =>
          a.currencyname.localeCompare(b.currencyname),
        );
        this.sortBycurreValid = false;
      } else {
        this.divisionss.sort((a, b) =>
          b.currencyname.localeCompare(a.currencyname),
        );
        this.sortBycurreValid = true;
      }
    } else {
      if (this.sortBycurreValid) {
        this.divisions.sort((a, b) =>
          a.currencyname.localeCompare(b.currencyname),
        );
        this.sortBycurreValid = false;
      } else {
        this.divisions.sort((a, b) =>
          b.currencyname.localeCompare(a.currencyname),
        );
        this.sortBycurreValid = true;
      }
    }
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.affiche == true) {
      if (this.sortByCodeValid) {
        this.divisionss.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.divisionss.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.divisions.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.divisions.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.affiche == true) {
      if (this.sortByNameValid) {
        this.divisionss.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.divisionss.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    } else {
      if (this.sortByNameValid) {
        this.divisions.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.divisions.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    }
  }

  sortByCityNameValid: boolean = true;
  sortByCityName() {
    if (this.affiche == true) {
      if (this.sortByCityNameValid) {
        this.divisionss.sort((a, b) =>
          (a.nameCity || "").localeCompare(b.nameCity || ""),
        );
        this.sortByCityNameValid = false;
      } else {
        this.divisionss.sort((a, b) =>
          (b.nameCity || "").localeCompare(a.nameCity || ""),
        );
        this.sortByCityNameValid = true;
      }
    } else {
      if (this.sortByCityNameValid) {
        this.divisions.sort((a, b) =>
          (a.nameCity || "").localeCompare(b.nameCity || ""),
        );
        this.sortByCityNameValid = false;
      } else {
        this.divisions.sort((a, b) =>
          (b.nameCity || "").localeCompare(a.nameCity || ""),
        );
        this.sortByCityNameValid = true;
      }
    }
  }

  sortByAddressValid: boolean = true;
  sortByAddress() {
    if (this.affiche == true) {
      if (this.sortByAddressValid) {
        this.divisionss.sort((a, b) =>
          (a.address || "").localeCompare(b.address || ""),
        );
        this.sortByAddressValid = false;
      } else {
        this.divisionss.sort((a, b) =>
          (b.address || "").localeCompare(a.address || ""),
        );
        this.sortByAddressValid = true;
      }
    } else {
      if (this.sortByAddressValid) {
        this.divisions.sort((a, b) =>
          (a.address || "").localeCompare(b.address || ""),
        );
        this.sortByAddressValid = false;
      } else {
        this.divisions.sort((a, b) =>
          (b.address || "").localeCompare(a.address || ""),
        );
        this.sortByAddressValid = true;
      }
    }
  }

  findArchivedPage() {
    this.loading = true;
    this.divisionService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.divisionss = result.content;
          this.divisionPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickdisArchive(id: string) {
    this.divisionService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("division"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.divisionService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("division"),
          }),
        );
      },
    });
  }
}
