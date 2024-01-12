import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { Willaya } from '../../models/willaya';
import { Page, initPage } from 'app/shared/models';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { WillayaService } from '../../services/willaya.service';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-willaya-list',
  templateUrl: './willaya-list.component.html',
  styleUrls: ['./willaya-list.component.scss']
})
export class WillayaListComponent implements OnInit {
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
  willaya: Willaya = {};
  willayas: Array<Willaya> = [];
  willayass: Array<Willaya> = [];
  loading = false;
  willayaPage: Page<Willaya> = initPage;
  willayaPages: Page<Willaya> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  currentStep = 0;
  steps: any = ["steps.general"];

  isChecked: boolean = false;
  affiche:boolean = false;
  constructor(
    private willayaservice:WillayaService,
    private translateService: TranslateService,

    private toastService: HotToastService,
    private http: HttpClient

  ) { }
   onCheckboxChange() {
     if (this.isChecked==false){

       this.affiche=false
     }
     else{
       this.affiche=true
     }
   }
  ngOnInit(): void {
    this.findArchivedPage();
    this.findPage();
    this.onPaginationChange.subscribe(() => {this.findPage();this.findArchivedPage()});
  }
  findPage() {
    this.loading = true;
    this.willayaservice
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.willayas = result.content;
          this.willayaPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.willayaservice.findById(id).subscribe({
      next: (result) => (this.willaya = result),
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
    this.willaya = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    this.willayaservice.save(id, this.willaya!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();-
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("willaya"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("willaya"),
          })
        );
      },
    });

  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-willaya",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });

  }

  onClickEdit(id: string) {
    this.findById(id);

    this.formModal.show({
      title: "menu.edit-willaya",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });

  }


  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.willayaservice.archive(id).subscribe({
        next: () => {
          this.findArchivedPage();
          this.findPage()
          this.archiveModal.hide();
            this.toastService.close("0");
            this.toastService.success(
              this.translateService.instant("success.deleted", {
                elem: this.translateService.instant("willaya"),
              })
            );
        },
      });
    });
  }

  sortByCodeValid: boolean = true;
  sortByCode() {
    if(this.affiche==true){
      if (this.sortByCodeValid) {
        this.willayass.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.willayass.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }
    }else{
      if (this.sortByCodeValid) {
        this.willayas.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.willayas.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }

    }

  }



  sortByNameValid: boolean = true;
  sortByName() {
    if(this.affiche==true){
      if (this.sortByNameValid) {
        this.willayass.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.willayass.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    }else{
      if (this.sortByNameValid) {
        this.willayas.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.willayas.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    }

  }





  findArchivedPage() {
    this.loading = true;
    this.willayaservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.willayass = result.content;
          this.willayaPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }


  lm(){
    alert("aaaa")
  }

  onClickdisArchive(id: string) {
    this.willayaservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("willaya"),
          })
        );
      },
    });
  }


  onClickDelete(id: string) {
    this.willayaservice.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("willaya"),
          })
        );
      },
    });
  }

}
