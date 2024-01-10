import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { SalesSKU } from "../../models/salesSku";
import { Page, initPage } from "app/shared/models";
import { SalesSkuService } from "../../services/sales-sku.service";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-sales-sku-list",
  templateUrl: "./sales-sku-list.component.html",
  styleUrls: ["./sales-sku-list.component.scss"],
})
export class SalesSkuListComponent implements OnInit {
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
  salessku: SalesSKU = {};
  salesskus: Array<SalesSKU> = [];
  loading = false;
  salesskuPage: Page<SalesSKU> = initPage;
  isChecked: boolean = false;
  affiche: boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  currentStep = 0;
  steps: any = ["steps.general"];

  constructor(
    private salesskuservice: SalesSkuService,
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
    this.findPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.salesskuservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.salesskus = result.content;
          this.salesskuPage = result;
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

  onCancel() {
    this.salessku = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      },
    );

    if (
      this.salessku.sailorCode == undefined ||
      this.salessku.sailorCodeSku == undefined ||
      this.salessku.sailorNameSku == undefined
    ) {
      this.toastService.close("0");
      this.toastService.warning("verify your code and name");
      return;
    }
    this.salesskuservice.save(id, this.salessku!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("salessku"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("salessku"),
          }),
        );
      },
    });
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-salessku",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-salessku",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });
  }

  onClickDelete(id: string) {
    this.deleteModal.show(() => {
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        },
      );
      this.salesskuservice.delete(id).subscribe({
        next: () => {
          this.findPage();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("salessku"),
            }),
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("salessku"),
            }),
          );
        },
      });
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.salesskuservice.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("salessku"),
            }),
          );
        },
      });
    });
  }

  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.salesskus.sort((a, b) => a.sailorCode.localeCompare(b.sailorCode));
      this.sortByCodeValid = false;
    } else {
      this.salesskus.sort((a, b) => b.sailorCode.localeCompare(a.sailorCode));
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
