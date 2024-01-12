import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { Page, initPage } from "app/shared/models";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";
import { SharedService } from "app/modules/company/services/shared.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-currency-list",
  templateUrl: "./currency-list.component.html",
  styleUrls: ["./currency-list.component.scss"],
})
export class CurrencyListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: DialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  currency: Currency = {};
  currencys: Array<Currency> = [];
  currencyss: Array<Currency> = [];
  loading = false;
  currencyPage: Page<Currency> = initPage;
  currencyPages: Page<Currency> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;
  affiche: boolean = false;
  currentStep = 0;
  steps: any = ["steps.general"];

  constructor(
    private sharedService: SharedService,
    private currencyService: CurrencyService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => {this.findPage();this.findArchivedPage()});
  }
  onCheckboxChange() {
    if (this.isChecked == false) {

      this.affiche = false
    }
    else {
      this.affiche = true
    }
  }
  findPage() {
    this.loading = true;
    this.currencyService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.currencys = result.content;
          this.currencyPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.currencyService.findById(id).subscribe({
      next: (result) => (this.currency = result),
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
    this.currency = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );


    this.currencyService.save(id, this.currency!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("currency"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("currency"),
          })
        );
      },
    });

  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-currency",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });


  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-currency",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });
  }


  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.currencyService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();

          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("currency"),
            })
          );

        },
      });
    });
  }

  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.affiche == true) {
      if (this.sortByCodeValid) {
        this.currencyss.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.currencyss.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }
    } else {
      if (this.sortByCodeValid) {
        this.currencys.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.currencys.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }
    }

  }

  sortBydigitalValid: boolean = true;
  sortBydigital() {
    if (this.affiche == true) {
      if (this.sortBydigitalValid) {
        this.currencyss.sort((a, b) => a.digitalcode.localeCompare(b.digitalcode));
        this.sortBydigitalValid = false
      } else {
        this.currencyss.sort((a, b) => b.digitalcode.localeCompare(a.digitalcode));
        this.sortBydigitalValid = true
      }
    } else {
      if (this.sortBydigitalValid) {
        this.currencys.sort((a, b) => a.digitalcode.localeCompare(b.digitalcode));
        this.sortBydigitalValid = false
      } else {
        this.currencys.sort((a, b) => b.digitalcode.localeCompare(a.digitalcode));
        this.sortBydigitalValid = true
      }
    }

  }
  sortBycountryValid: boolean = true;
  sortBycountry() {
    if (this.affiche == true) {
      if (this.sortBycountryValid) {
        this.currencyss.sort((a, b) => a.countryname.localeCompare(b.countryname));
        this.sortBycountryValid = false
      } else {
        this.currencyss.sort((a, b) => b.countryname.localeCompare(a.countryname));
        this.sortBycountryValid = true
      }
    } else {
      if (this.sortBycountryValid) {
        this.currencys.sort((a, b) => a.countryname.localeCompare(b.countryname));
        this.sortBycountryValid = false
      } else {
        this.currencys.sort((a, b) => b.countryname.localeCompare(a.countryname));
        this.sortBycountryValid = true
      }
    }


  }


  sortByNameValid: boolean = true;
  sortByName() {
    if (this.affiche == true) {
      if (this.sortByNameValid) {
        this.currencyss.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.currencyss.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    } else {
      if (this.sortByNameValid) {
        this.currencys.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.currencys.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    }

  }


  findArchivedPage() {
    this.loading = true;
    this.currencyService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.currencyss = result.content;
          this.currencyPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }



  onClickdisArchive(id: string) {
    this.currencyService.disArchive(id).subscribe({
      next: () => {
        this.findPage();
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("currency"),
          })
        );
      },
    });
  }



  onClickDelete(id: string) {
    this.currencyService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("currency"),
          })
        );
      },
    });
  }



}
