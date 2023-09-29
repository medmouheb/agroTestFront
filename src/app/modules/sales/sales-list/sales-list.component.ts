import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { Sales } from '../models/sales';
import { Page, initPage } from 'app/shared/models';
import { SalesService } from './../service/sales.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;

  filter = "";
  pageNumber = 0;
  pageSize = 10;
  sales: Sales = {};
  saless: Array<Sales> = [];
  salesss: Array<Sales> = [];
  loading = false;
  salesPage: Page<Sales> = initPage;
  salesPages: Page<Sales> = initPage;
  isChecked: boolean = false;
  affiche: boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  currentStep = 0;
  steps: any = ["steps.general", "currency"];

  constructor(
    private salesservice: SalesService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) { }
  onCheckboxChange() {
    console.log("La valeur de la case à cocher est : ", this.isChecked);
    if (this.isChecked == false) {

      this.affiche = false
    }
    else {
      this.affiche = true
    }
  }
  ngOnInit(): void {
    // this.salesservice.findAll().subscribe((saless) => {
    //   this.saless = saless;
    //   console.log("saless",saless)
    // });
    this.findPage();
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.salesservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log("findPage", result)

          this.saless = result.content;
          this.salesPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickdisArchive(id: string) {
    this.salesservice.disArchive(id).subscribe({
      next: () => {
        this.findPage();
        this.findArchivedPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("sales"),
          })
        );
        console.log(id);
      },
    });
  }

  onClickDelete(id: string) {
    this.salesservice.delete(id).subscribe({
      next: () => {
        this.findPage();
        this.findArchivedPage();
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("sales"),
          })
        );
      },
    });
  }

  findArchivedPage() {
    this.loading = true;
    this.salesservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {

          console.log("findArchivedPage", result)

          this.salesss = result.content;
          this.salesPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.salesservice.findById(id).subscribe({
      next: (result) => {this.sales = result 
        console.log(this.sales)
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
    console.log(pageSize)
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  onCancel() {
    this.sales = {};
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
      }
    );
    console.log(this.sales.currency)
    if (this.estObjetVide(this.sales.currency)) {
      this.toastService.error("you must select a currency ")
      return console.log("okk");
    }
    this.salesservice.save(id, this.sales!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("sales"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("sales"),
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
      title: "menu.add-sales",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    console.log('nn',id)
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    console.log('aa',this.sales)
    this.formModal.show({
      title: "menu.edit-sales",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  // onClickDelete(id: string) {
  //   this.deleteModal.show(() => {
  //     this.toastService.loading(
  //       this.translateService.instant("message.loading..."),
  //       {
  //         id: "0",
  //       }
  //     );
  //     this.salesservice.delete(id).subscribe({
  //       next: () => {
  //         this.findPage();
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.success(
  //           this.translateService.instant("success.deleted", {
  //             elem: this.translateService.instant("sales"),
  //           })
  //         );
  //       },
  //       error: (error) => {
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.error(
  //           this.translateService.instant(error.error, {
  //             elem: this.translateService.instant("sales"),
  //           })
  //         );
  //       },
  //     });
  //   });
  // }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.salesservice.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("sales"),
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
      this.saless.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.saless.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.saless.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.saless.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }


  sortByCityNameValid: boolean = true;
  sortByCityName() {
    if (this.sortByCityNameValid) {
      this.saless.sort((a, b) => (a.payment_Term || "").localeCompare((b.payment_Term || "")));
      this.sortByCityNameValid = false
    } else {
      this.saless.sort((a, b) => (b.payment_Term || "").localeCompare((a.payment_Term || "")));
      this.sortByCityNameValid = true
    }
  }


  sortByAddressValid: boolean = true;
  sortByAddress() {
    if (this.sortByAddressValid) {
      this.saless.sort((a, b) => (a.type || "").localeCompare((b.type || "")));
      this.sortByAddressValid = false
    } else {
      this.saless.sort((a, b) => (b.type || "").localeCompare((a.type || "")));
      this.sortByAddressValid = true
    }
  }

}
