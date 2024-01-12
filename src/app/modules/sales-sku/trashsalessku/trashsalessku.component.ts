import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";

import { SalesSKU } from "../models/salesSku";
import { SalesSkuService } from "../services/sales-sku.service";

@Component({
  selector: "app-trashsalessku",
  templateUrl: "./trashsalessku.component.html",
  styleUrls: ["./trashsalessku.component.scss"],
})
export class TrashsalesskuComponent implements OnInit {
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

  salessku: SalesSKU = {};
  salesskus: Array<SalesSKU> = [];
  Page: Page<SalesSKU> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private salesskuservice: SalesSkuService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }
  goto() {
    this.router.navigateByUrl("/salesku");
  }

  findArchivedPage() {
    this.loading = true;
    this.salesskuservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.salesskus = result.content;
          this.Page = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.salesskuservice.findById(id).subscribe({
      next: (result) => (this.salessku = result),
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
    this.salesskuservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("salessku"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.salesskuservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("salessku"),
          }),
        );
      },
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.salesskus.sort((a, b) =>
        a.sailorCodeSku.localeCompare(b.sailorCodeSku),
      );
      this.sortByCodeValid = false;
    } else {
      this.salesskus.sort((a, b) =>
        b.sailorCodeSku.localeCompare(a.sailorCodeSku),
      );
      this.sortByCodeValid = true;
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.salesskus.sort((a, b) =>
        a.sailorNameSku.localeCompare(b.sailorNameSku),
      );
      this.sortByNameValid = false;
    } else {
      this.salesskus.sort((a, b) =>
        b.sailorNameSku.localeCompare(a.sailorNameSku),
      );
      this.sortByNameValid = true;
    }
  }
}
