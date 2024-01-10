import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { Warehouse } from "app/modules/warehouse/models/warehouse.model";
import { WarehouseService } from "app/modules/warehouse/services/warehouse.service";
import { Page, initPage } from "app/shared/models";
import { GrowoutService } from "app/modules/growout/services/growout.service";
import { Growout } from "app/modules/growout/models/growout";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Division } from "../models/division";
import { DivisionService } from "../services/division.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-trash",
  templateUrl: "./trashD.component.html",
  styleUrls: ["./trash.component.scss"],
})
export class TrashDComponent implements OnInit {
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

  division: Division = {};
  divisions: Array<Division> = [];
  Page: Page<Division> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private divisionService: DivisionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.divisionService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.divisions = result.content;
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
    this.divisionService.findById(id).subscribe({
      next: (result) => (this.division = result),
      error: (error) => console.error(error),
    });
  }
  goto() {
    this.router.navigateByUrl("/division");
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
    this.divisionService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

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

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("division"),
          }),
        );
      },
    });
  }
  sortBySpiecValid: boolean = true;
  sortBySpiec() {
    if (this.sortBySpiecValid) {
      this.divisions.sort((a, b) => a.speciesType.localeCompare(b.speciesType));
      this.sortBySpiecValid = false;
    } else {
      this.divisions.sort((a, b) => b.speciesType.localeCompare(a.speciesType));
      this.sortBySpiecValid = true;
    }
  }
  sortBycompValid: boolean = true;
  sortBycomp() {
    if (this.sortBycompValid) {
      this.divisions.sort((a, b) => a.companyname.localeCompare(b.companyname));
      this.sortBycompValid = false;
    } else {
      this.divisions.sort((a, b) => b.companyname.localeCompare(a.companyname));
      this.sortBycompValid = true;
    }
  }
  sortBycurreValid: boolean = true;
  sortBycurre() {
    if (this.sortBycurreValid) {
      this.divisions.sort((a, b) =>
        a.currencyname.localecurreare(b.currencyname),
      );
      this.sortBycurreValid = false;
    } else {
      this.divisions.sort((a, b) =>
        b.currencyname.localecurreare(a.currencyname),
      );
      this.sortBycurreValid = true;
    }
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.divisions.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false;
    } else {
      this.divisions.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true;
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.divisions.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false;
    } else {
      this.divisions.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true;
    }
  }

  sortByCityNameValid: boolean = true;
  sortByCityName() {
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

  sortByAddressValid: boolean = true;
  sortByAddress() {
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
