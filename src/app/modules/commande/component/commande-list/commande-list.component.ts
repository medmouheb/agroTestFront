import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";

import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Commande } from "../../models/commande.model";
import { CommandeService } from "../../services/commande.service";

import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { HotToastService } from "@ngneat/hot-toast";
@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})

export class CommandeListComponent implements OnInit {

  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("importModal")
  importModal!: DialogComponent;
  
  @ViewChild("stepper")
  stepper!: StepperComponent;

  currentStep = 0;
  steps: any = [
    "steps.general",
    "steps.information",
    "steps.schedule",
    
  ];

  show: boolean = false;
  loading = false;
  commandes: Array<Commande> = [];
  commande: Commande = {};
  commandesPage: Page<Commande> = initPage;
  pageNumber = 0;
  pageSize = 10;
  filter = "";
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  file: File | null = null;

  constructor(
    private commandesService: CommandeService,
    private filesService: FilesService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.findPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }


  findPage() {
    this.loading = true;
    this.commandesService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.commandes = result.content;
          this.commandesPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });

  }

   findById(id: string) {
    this.commandesService.findById(id).subscribe({
      next: (result) => (this.commande = result),
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
    this.commande = {};
    this.currentStep = 0;
  }

   onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );
    this.commandesService.save(id, this.commande!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("Modalité de paiement"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("Modalité de paiement"),
          })
        );
      },
    });
  }

onDownloadCSVTempalte() {
    this.commandesService.downloadCSVTemplate().subscribe({
      next: (data) =>
        this.filesService.download(
          data,
          this.translateService.instant("menu.commande") + ".csv"
        ),
      error: (error) => console.error(error),
    });
  }

  onCSVChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (!fileList) {
      return;
    }
    this.file = fileList[0];
  }

   onCSVImport() {
    if (!this.file) {
      return;
    }
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    let formData: FormData = new FormData();
    formData.append("file", this.file);
    this.commandesService.importCSV(formData).subscribe({
      next: () => {
        this.toastService.close("0");
        this.importModal.hide();
        this.findPage();
        this.file = null;
        this.toastService.success(
          this.translateService.instant("success.imported", {
            elem: this.translateService.instant("menu.commande"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(this.translateService.instant(error.error));
      },
    });
  }


   openImportModal() {
    this.importModal.show({
      title: "menu.import-commande",
      btnLabel: "btns.import",
      confirm: () => this.onCSVImport(),
      cancel: () => (this.file = null),
    });
  }

  onWizardSave(id: string | null) {
    if (this.stepper.lastStep()) {
      this.onSave(id);
      return;
    }
    this.stepper.nextStep();
  }

  onStepChange(step: number) {
    this.currentStep = step;
  }


   onClickAdd() {
    this.formModal.show({
      title: "menu.add-commande",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-commande",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
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
      this.commandesService.delete(id).subscribe({
        next: () => {
          this.findPage();
          this.deleteModal.hide();
          this.toastService.close("0");
          this.onFilterChange("");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("Modalité de paiement"),
            })
          );
        },
        error: (error) => {
          this.deleteModal.hide();
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("Modalité de paiement"),
            })
          );
        },
      });
    });
  }



  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.commandesService.archive(id).subscribe({
        next: () => {
          this.findPage()
          this.archiveModal.hide();
          this.toastService.success;
          
        },
      });
    });
  }







}
