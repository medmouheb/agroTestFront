import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { Fournisseur } from "../models/fournisseur.model";
import { FournisseursService } from "../services/fournisseurs.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.scss"],
})
export class TrashFouComponent implements OnInit {
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

  fournisseur: Fournisseur = {};
  fournisseurs: Array<Fournisseur> = [];
  Page: Page<Fournisseur> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private fournisseursService: FournisseursService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }

  findArchivedPage() {
    this.loading = true;
    this.fournisseursService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.fournisseurs = result.content;
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
    this.fournisseursService.findById(id).subscribe({
      next: (result) => (this.fournisseur = result),
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
    this.fournisseursService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("vendor"),
          }),
        );
      },
    });
  }

  onClickDelete(id: string) {
    this.fournisseursService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("vendor"),
          }),
        );
      },
    });
  }
  goto() {
    this.router.navigateByUrl("/fournisseurs");
  }
}
