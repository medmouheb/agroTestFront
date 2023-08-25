import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { LogisticUnit } from '../../models/logistic-unit';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogisticUnitService } from '../../services/logistic-unit.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Page, initPage } from 'app/shared/models';

@Component({
  selector: 'app-logistic-unit-list',
  templateUrl: './logistic-unit-list.component.html',
  styleUrls: ['./logistic-unit-list.component.scss']
})
export class LogisticUnitListComponent implements OnInit {

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
  camp: LogisticUnit = {};
  companys: Array<LogisticUnit> = [];
  companyss: Array<LogisticUnit> = [];
  loading = false;
  companyPage: Page<LogisticUnit> = initPage;
  companyPages: Page<LogisticUnit> = initPage;

  isChecked: boolean = false;
  affiche:boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  fullDetail=false

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor(
    private logisticUnitService: LogisticUnitService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private formBuilder: FormBuilder
  ) { }
  onCheckboxChange() {
    console.log("La valeur de la case à cocher est : ", this.isChecked);
    if (this.isChecked==false){

      this.affiche=false
    }
    else{
      this.affiche=true
    }
  }
  // onCheckboxFullChange() {
  //   console.log("La valeur de la case à cocher est : ", this.isCheckedFull);
  //   if (this.isCheckedFull==false){

  //     this.fullDetail=false
  //   }
  //   else{
  //     this.fullDetail=true
  //   }
  // }

  // isCheckedFull:false
  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.logisticUnitService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log("aze",result.content)
          this.companys = result.content;
          this.companyPage = result;

        },
        error: (error) => {
          this.loading = false;
          console.error("aze",error );
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.logisticUnitService.findById(id).subscribe({
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

    this.logisticUnitService.save(id, this.camp!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("company"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("company"),
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
      title: "menu.add-Logistic",
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
        title: "menu.edit-Logistic-Unit",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);

  }

 

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.logisticUnitService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("company"),
            })
          );
          //   console.log(id);
        },
        // error: (error) => {
        //   this.archiveModal.hide();
        //   this.toastService.close("0");
        //   this.toastService.error(
        //     this.translateService.instant(error.error, {
        //       elem: this.translateService.instant("growout"),
        //     })
        //   );
        // },
      });
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.companys.sort((a, b) => a.logisticCode.localeCompare(b.logisticCode));
      this.sortByCodeValid = false
    } else {
      this.companys.sort((a, b) => b.logisticCode.localeCompare(a.logisticCode));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.companys.sort((a, b) => a.logisticName.localeCompare(b.logisticName));
      this.sortByNameValid = false
    } else {
      this.companys.sort((a, b) => b.logisticName.localeCompare(a.logisticName));
      this.sortByNameValid = true
    }
  }








  onClickdisArchive(id: string) {
    console.log(id);

    this.logisticUnitService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("company"),
          })
        );
        console.log(id);
      },
    });
  }

  onClickDelete(id: string) {
    console.log("id: " + id);
    this.logisticUnitService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("company"),
          })
        );
      },
    });
  }






















  findArchivedPage() {
    this.loading = true;
    this.logisticUnitService
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
