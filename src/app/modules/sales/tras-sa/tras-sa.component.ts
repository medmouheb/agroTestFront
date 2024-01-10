import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Sales } from "../models/sales";
import { Page, initPage } from "app/shared/models";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";

import { SalesService } from "../service/sales.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-tras-sa",
  templateUrl: "./tras-sa.component.html",
  styleUrls: ["./tras-sa.component.scss"],
})
export class TrasSAComponent implements OnInit {
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
  sales: Sales = {};
  saless: Array<Sales> = [];
  test: any;
  salesPage: Page<Sales> = initPage;

  Page: Page<Sales> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private salesservice: SalesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.salesservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.test = result.content;
          this.saless = result.content;
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
    this.salesservice.findById(id).subscribe({
      next: (result) => (this.sales = result),
      error: (error) => console.error(error),
    });
  }
  goto() {
    this.router.navigateByUrl("/sales");
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
    this.salesservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("sales"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.salesservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("sales"),
          }),
        );
      },
    });
  }
}
