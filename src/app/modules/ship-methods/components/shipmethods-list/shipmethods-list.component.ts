import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";

import { Page, initPage } from "app/shared/models";
import { ShipmethodsService } from "../../Services/shipmethods.service";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngneat/hot-toast";
import { ShipMethods } from "app/modules/ship-methods/models/shipsmethods";

@Component({
  selector: "app-shipmethods-list",
  templateUrl: "./shipmethods-list.component.html",
  styleUrls: ["./shipmethods-list.component.scss"],
})
export class ShipmethodsListComponent implements OnInit {
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
  shipmethod: ShipMethods = {};

  shipmethods: Array<ShipMethods> = [];
  shipmethodss: Array<ShipMethods> = [];
  loading = false;
  shipmethodPage: Page<ShipMethods> = initPage;
  shipmethodPages: Page<ShipMethods> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  currentStep = 0;
  steps: any = ["steps.general"];

  isChecked: boolean = false;
  affiche: boolean = false;
  constructor(
    private shipmethodsservice: ShipmethodsService,
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
    this.findArchivedPage();
    this.findPage();
    this.onPaginationChange.subscribe(() => {
      this.findPage();
      this.findArchivedPage();
    });
  }
  findPage() {
    this.loading = true;
    this.shipmethodsservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.shipmethods = result.content;
          this.shipmethodPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.shipmethodsservice.findById(id).subscribe({
      next: (result) => (this.shipmethod = result),
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
    this.shipmethod = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      },
    );
    if (this.shipmethod.code == undefined || this.shipmethod.code == "") {
      this.toastService.close("0");
      this.toastService.warning("Verify your shipmethod code");
      return;
    } else if (
      this.shipmethod.name == undefined ||
      this.shipmethod.name == ""
    ) {
      this.toastService.close("0");
      this.toastService.warning("Verify your shipmethod name");
      return;
    }

    this.shipmethodsservice.save(id, this.shipmethod!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("shipmethod"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("shipmethod"),
          }),
        );
      },
    });
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-shipmethod",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });
    this.formModal.setsubmitstatus(false);
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-shipmethod",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });
    this.formModal.setsubmitstatus(true);
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.shipmethodsservice.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("shipmethod"),
            }),
          );
        },
      });
    });
  }

  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.affiche) {
      if (this.sortByCodeValid) {
        this.shipmethodss.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.shipmethodss.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.shipmethods.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false;
      } else {
        this.shipmethods.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true;
      }
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.affiche) {
      if (this.sortByNameValid) {
        this.shipmethodss.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.shipmethodss.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    } else {
      if (this.sortByNameValid) {
        this.shipmethods.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false;
      } else {
        this.shipmethods.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true;
      }
    }
  }

  findArchivedPage() {
    this.loading = true;
    this.shipmethodsservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.shipmethodss = result.content;
          this.shipmethodPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickdisArchive(id: string) {
    this.shipmethodsservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("shipmethod"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.shipmethodsservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("shipmethod"),
          }),
        );
      },
    });
  }
}
