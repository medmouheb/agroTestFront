import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { Currency } from "../models/currency";
import { CurrencyService } from "../services/currency.service";

@Component({
  selector: "app-trash",
  templateUrl: "./curtrash.component.html",
  styleUrls: ["./curtrash.component.scss"],
})
export class CurrTrashComponent implements OnInit {
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

  currency: Currency = {};
  currencys: Array<Currency> = [];
  Page: Page<Currency> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private currrencyService: CurrencyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.currrencyService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.currencys = result.content;
          this.Page = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }
  goto() {
    this.router.navigateByUrl("/currency");
  }

  findById(id: string) {
    this.currrencyService.findById(id).subscribe({
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

  onClickdisArchive(id: string) {
    this.currrencyService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("currency"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.currrencyService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("currency"),
          }),
        );
      },
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.currencys.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false;
    } else {
      this.currencys.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true;
    }
  }

  sortBydigitalValid: boolean = true;
  sortBydigital() {
    if (this.sortBydigitalValid) {
      this.currencys.sort((a, b) => a.digitalcode.localeCompare(b.digitalcode));
      this.sortBydigitalValid = false;
    } else {
      this.currencys.sort((a, b) => b.digitalcode.localeCompare(a.digitalcode));
      this.sortBydigitalValid = true;
    }
  }
  sortBycountryValid: boolean = true;
  sortBycountry() {
    if (this.sortBycountryValid) {
      this.currencys.sort((a, b) => a.countryname.localeCompare(b.countryname));
      this.sortBycountryValid = false;
    } else {
      this.currencys.sort((a, b) => b.countryname.localeCompare(a.countryname));
      this.sortBycountryValid = true;
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.currencys.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false;
    } else {
      this.currencys.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true;
    }
  }
}
