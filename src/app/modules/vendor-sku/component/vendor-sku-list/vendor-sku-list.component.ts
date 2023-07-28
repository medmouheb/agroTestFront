import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { VendorSKU } from '../../models/vendorsku';
import { Page, initPage } from 'app/shared/models';
import { VendorskuService } from '../../serivce/vendorsku.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-vendor-sku-list',
  templateUrl: './vendor-sku-list.component.html',
  styleUrls: ['./vendor-sku-list.component.scss']
})
export class VendorSKUListComponent implements OnInit {

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
  vendorsku: VendorSKU = {};
  vendorskus: Array<VendorSKU> = [];
  loading = false;
  vendorskuPage: Page<VendorSKU> = initPage;
  isChecked: boolean = false;
  affiche:boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  currentStep = 0;
  steps: any = ["steps.general"];

  constructor(
    private vendorsskuservice: VendorskuService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {}
  onCheckboxChange() {
    console.log("La valeur de la case à cocher est : ", this.isChecked);
    if (this.isChecked==false){

      this.affiche=false
    }
    else{
      this.affiche=true
    }
  }
  ngOnInit(): void {
    this.findPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.vendorsskuservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log(result.content)
          this.vendorskus = result.content;
          this.vendorskuPage = result;
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

  onCancel() {
    this.vendorsku = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    console.log(this.vendorsku)
    if((this.vendorsku.vendorCode==undefined) ||(this.vendorsku.vendorSKUCode==undefined)||(this.vendorsku.vendorSKUName==undefined)  ){
      this.toastService.close("0");
      this.toastService.warning("verify your code and name"
       
      );
      return;
    }
    this.vendorsskuservice.save(id, this.vendorsku!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide ();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("vendorsku"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("vendorsku"),
          })
        );
      },
    });
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-vendorsku",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-vendorsku",
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
        }
      );
      this.vendorsskuservice.delete(id).subscribe({
        next: () => {
          this.findPage();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("vendorsku"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("vendorsku"),
            })
          );
        },
      });
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.vendorsskuservice.archive(id).subscribe({
        next: () => {
             this.findPage();
          this.archiveModal.hide();
            this.toastService.close("0");
            this.toastService.success(
              this.translateService.instant("success.deleted", {
                elem: this.translateService.instant("vendorsku"),
              })
            );
          console.log(id);

          //   console.log(id);
        },
        // error: (error) => {
        //   this.archiveModal.hide();
        //   this.toastService.close("0");
        //   this.toastService.error(
        //     this.translateService.instant(error.error, {
        //       elem: this.translateService.instant("growout"),
        //     })
        //   );
        // },
      });
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
