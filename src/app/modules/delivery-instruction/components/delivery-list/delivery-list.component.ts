import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { Page, initPage } from "app/shared/models";
import { DeliveryService } from "../../Services/delivery.service";
import { Delivery } from "../../models/delivery";
import { SharedService } from "app/modules/company/services/shared.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-delivery-list",
  templateUrl: "./delivery-list.component.html",
  styleUrls: ["./delivery-list.component.scss"],
})
export class DeliveryListComponent implements OnInit {
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
  delivery: Delivery = {};
  deliverys: Array<Delivery> = [];
  deliveryss: Array<Delivery> = [];
  loading = false;
  deliveryPage: Page<Delivery> = initPage;
  deliveryPages: Page<Delivery> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;
  affiche: boolean = false;
  currentStep = 0;
  steps: any = ["steps.general", "steps.general"];

  constructor(
    private deliveryservice: DeliveryService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private sharedService: SharedService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => {
      this.findPage();
      this.findArchivedPage();
    });
  }
  onCheckboxChange() {
    if (this.isChecked == false) {
      this.affiche = false;
    } else {
      this.affiche = true;
    }
  }
  findPage() {
    this.loading = true;
    this.deliveryservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.deliverys = result.content;
          this.deliveryPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.deliveryservice.findById(id).subscribe({
      next: (result) => {
        this.delivery = result;
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
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  onCancel() {
    this.delivery = {};
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
      this.delivery.productType == undefined ||
      this.delivery.instructiuonCode == undefined ||
      this.delivery.instructiuonName == undefined
    ) {
      this.toastService.close("0");
      let lg = localStorage.getItem("locale");
      this.http
        .get("../../../../../assets/i18n/" + lg + ".json")
        .subscribe((data: any) => {
          this.toastService.warning(data.verifCodeName);
        });

      return;
    }

    this.deliveryservice.save(id, this.delivery!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("delivery"),
          }),
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("delivery"),
          }),
        );
      },
    });
  }

  onClickAdd() {
    this.delivery = {};
    this.formModal.show({
      title: "menu.add-delivery",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });
    setTimeout(() => {
      this.sharedService.setIsActive(false);
    }, 500);
  }

  onClickEdit(id: string) {
    this.findById(id);
    setTimeout(() => {}, 2000);
    this.formModal.show({
      title: "menu.edit-delivery",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.deliveryservice.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();

          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("delivery"),
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
        this.deliveryss.sort((a, b) =>
          a.instructiuonCode.localeCompare(b.instructiuonCode),
        );
        this.sortByCodeValid = false;
      } else {
        this.deliveryss.sort((a, b) =>
          b.instructiuonCode.localeCompare(a.instructiuonCode),
        );
        this.sortByCodeValid = true;
      }
    } else {
      if (this.sortByCodeValid) {
        this.deliverys.sort((a, b) =>
          a.instructiuonCode.localeCompare(b.instructiuonCode),
        );
        this.sortByCodeValid = false;
      } else {
        this.deliverys.sort((a, b) =>
          b.instructiuonCode.localeCompare(a.instructiuonCode),
        );
        this.sortByCodeValid = true;
      }
    }
  }

  sortBydigitalValid: boolean = true;
  sortBydigital() {
    if (this.affiche) {
      if (this.sortBydigitalValid) {
        this.deliveryss.sort((a, b) =>
          a.productType.localeCompare(b.productType),
        );
        this.sortBydigitalValid = false;
      } else {
        this.deliveryss.sort((a, b) =>
          b.productType.localeCompare(a.productType),
        );
        this.sortBydigitalValid = true;
      }
    } else {
      if (this.sortBydigitalValid) {
        this.deliverys.sort((a, b) =>
          a.productType.localeCompare(b.productType),
        );
        this.sortBydigitalValid = false;
      } else {
        this.deliverys.sort((a, b) =>
          b.productType.localeCompare(a.productType),
        );
        this.sortBydigitalValid = true;
      }
    }
  }
  sortBycountryValid: boolean = true;
  sortBycountry() {
    if (this.affiche) {
      if (this.sortBycountryValid) {
        this.deliveryss.sort((a, b) =>
          a.instructiuonName.localeCompare(b.instructiuonName),
        );
        this.sortBycountryValid = false;
      } else {
        this.deliveryss.sort((a, b) =>
          b.instructiuonName.localeCompare(a.instructiuonName),
        );
        this.sortBycountryValid = true;
      }
    } else {
      if (this.sortBycountryValid) {
        this.deliverys.sort((a, b) =>
          a.instructiuonName.localeCompare(b.instructiuonName),
        );
        this.sortBycountryValid = false;
      } else {
        this.deliverys.sort((a, b) =>
          b.instructiuonName.localeCompare(a.instructiuonName),
        );
        this.sortBycountryValid = true;
      }
    }
  }

  findArchivedPage() {
    this.loading = true;
    this.deliveryservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.deliveryss = result.content;
          this.deliveryPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickdisArchive(id: string) {
    this.deliveryservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("delivery"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.deliveryservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("delivery"),
          }),
        );
      },
    });
  }
}
