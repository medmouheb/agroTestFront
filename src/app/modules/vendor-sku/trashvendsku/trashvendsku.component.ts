import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { Page, initPage } from 'app/shared/models';
import { VendorSKU } from '../models/vendorsku';
import { VendorskuService } from '../serivce/vendorsku.service';

@Component({
  selector: 'app-trashvendsku',
  templateUrl: './trashvendsku.component.html',
  styleUrls: ['./trashvendsku.component.scss']
})
export class TrashvendskuComponent implements OnInit {

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

  vendorsku: VendorSKU = {};
  vendorskus: Array<VendorSKU> = [];
  Page: Page<VendorSKU> =initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private vendorsskuservice: VendorskuService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();
    console.log(this.findArchivedPage.length);
    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }
  goto(){
    this.router.navigateByUrl("/vendorsku")
  }

  findArchivedPage() {
    this.loading = true;
    this.vendorsskuservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.vendorskus = result.content;
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
    this.vendorsskuservice.findById(id).subscribe({
      next: (result) => (this.vendorsku = result),
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
    this.vendorsskuservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("vendorsku"),
          })
        );
        console.log(id);
      },
    });
  }

  // onClickdisArchive(id: string) {
  //   console.log("====================================");
  //   console.log("ji");
  //   console.log("====================================");
  //   this.disarchiveModal.show(() => {
  //     console.log("====================================");
  //     console.log("yep");
  //     console.log("====================================");
  //     this.toastService.loading(
  //       this.translateService.instant("message.loading..."),
  //       {
  //         id: "0",
  //       }
  //     );
  //     this.vendorsskuservice.disArchive(id).subscribe({
  //       next: () => {
  //         this.disarchiveModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.success(
  //           this.translateService.instant("success.deleted", {
  //             elem: this.translateService.instant("item"),
  //           })
  //         );
  //       },
  //       // error: (error) => {
  //       //   this.disarchiveModal.hide();
  //       //   this.toastService.close("0");
  //       //   this.toastService.error(
  //       //     this.translateService.instant(error.error, {
  //       //       elem: this.translateService.instant("item"),
  //       //     })
  //       //   );
  //       // },
  //     });
  //   });
  // }

  onClickDelete(id: string) {
    this.vendorsskuservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("vendorsku"),
          })
        );
      },
    });
  }
  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.vendorskus.sort((a, b) => a.vendorSKUCode.localeCompare(b.vendorSKUCode));
      this.sortByCodeValid = false
    } else {
      this.vendorskus.sort((a, b) => b.vendorSKUCode.localeCompare(a.vendorSKUCode));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.vendorskus.sort((a, b) => a.vendorSKUName.localeCompare(b.vendorSKUName));
      this.sortByNameValid = false
    } else {
      this.vendorskus.sort((a, b) => b.vendorSKUName.localeCompare(a.vendorSKUName));
      this.sortByNameValid = true
    }
  }
}
