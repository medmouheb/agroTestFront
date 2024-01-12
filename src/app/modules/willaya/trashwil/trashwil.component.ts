import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { Willaya } from '../models/willaya';
import { Page, initPage } from 'app/shared/models';
import { WillayaService } from '../services/willaya.service';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trashwil',
  templateUrl: './trashwil.component.html',
  styleUrls: ['./trashwil.component.scss']
})
export class TrashwilComponent implements OnInit {

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

  willaya: Willaya = {};
  willayas: Array<Willaya> = [];
  willayaPage: Page<Willaya> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
  private willayaservice:WillayaService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }
  findArchivedPage() {
    this.loading = true;
    this.willayaservice
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
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
  goto(){
    this.router.navigateByUrl("/willaya")
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

  onClickdisArchive(id: string) {
    this.willayaservice.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

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
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("willaya"),
          })
        );
      },
    });
  }

}
