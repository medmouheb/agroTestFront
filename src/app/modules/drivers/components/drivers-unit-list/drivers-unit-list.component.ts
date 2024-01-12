import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { Drivers } from '../../models/drivers';
import { Page, initPage } from 'app/shared/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DriversService } from '../../services/drivers.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-drivers-unit-list',
  templateUrl: './drivers-unit-list.component.html',
  styleUrls: ['./drivers-unit-list.component.scss']
})
export class DriversUnitListComponent implements OnInit {

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
  camp: Drivers = {};
  companys: Array<Drivers> = [];
  companyss: Array<Drivers> = [];
  loading = false;
  companyPage: Page<Drivers> = initPage;
  companyPages: Page<Drivers> = initPage;
  isChecked: boolean = false;
  affiche:boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  fullDetail=false

  currentStep = 0;
  steps: any = [
    "steps.general",
    "steps.information",
    "steps.historique-de-maintenance",
  ];

  constructor(
    private driversService: DriversService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private formBuilder: FormBuilder
  ) { }
  onCheckboxChange() {
    if (this.isChecked==false){

      this.affiche=false
    }
    else{
      this.affiche=true
    }
  }
  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.driversService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companys = result.content;
          this.companyPage = result;
        },
        error: (error) => {
          this.loading = false;
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.driversService.findById(id).subscribe({
      next: (result) => (this.camp = result),
      error: (error) => console.error(error),
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 0;
    this.findPage();
    this.findArchivedPage()
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
      }
    );

    this.driversService.save(id, this.camp!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("Drivers"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("Drivers"),
          })
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
      title: "menu.add-Drivers",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);

    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.edit-Drivers",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);

  }



  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.driversService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("Drivers"),
            })
          );
        },
      });
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.companys.sort((a, b) => a.codeEmploye.localeCompare(b.codeEmploye));
      this.sortByCodeValid = false
    } else {
      this.companys.sort((a, b) => b.codeEmploye.localeCompare(a.codeEmploye));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.companys.sort((a, b) => a.nomDuChauffeur.localeCompare(b.nomDuChauffeur));
      this.sortByNameValid = false
    } else {
      this.companys.sort((a, b) => b.nomDuChauffeur.localeCompare(a.nomDuChauffeur));
      this.sortByNameValid = true
    }
  }








  onClickdisArchive(id: string) {

    this.driversService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("Drivers"),
          })
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.driversService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("Drivers"),
          })
        );
      },
    });
  }






















  findArchivedPage() {
    this.loading = true;
    this.driversService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.companyss = result.content;
          this.companyPages=result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

}
