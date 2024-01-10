import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { Warehouse } from "app/modules/warehouse/models/warehouse.model";
import { WarehouseService } from "app/modules/warehouse/services/warehouse.service";
import { Page, initPage } from "app/shared/models";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "../stepper/stepper.component";
import { WizardDialogComponent } from "../wizard-dialog/wizard-dialog.component";
import { GrowoutService } from "app/modules/growout/services/growout.service";
import { Growout } from "app/modules/growout/models/growout";
import { Router } from "@angular/router";

@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.scss"],
})
export class TrashComponent implements OnInit {
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

  growout: Growout = {};
  growouts: Array<Growout> = [];
  Page: Page<Growout> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private growoutService: GrowoutService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.growoutService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.growouts = result.content;
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
    this.router.navigateByUrl("/growout");
  }
  findById(id: string) {
    this.growoutService.findById(id).subscribe({
      next: (result) => (this.growout = result),
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
    this.growoutService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.reset", {
            elem: this.translateService.instant("growout"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.growoutService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("warehouse"),
          }),
        );
      },
    });
  }
}
