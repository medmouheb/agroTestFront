import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Fournisseur } from "../../models/fournisseur.model";
import { FournisseursService } from "../../services/fournisseurs.service";

@Component({
  selector: "app-fournisseurs-list",
  templateUrl: "./fournisseurs-list.component.html",
  styleUrls: ["./fournisseurs-list.component.scss"],
})
export class FournisseursListComponent implements OnInit {
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
    "steps.shippingLocation",
    "steps.vendorSKU",
  ];
  isChecked: boolean = false;
  affiche:boolean = false;
  loading = false;
  fournisseurs: Array<Fournisseur> = [];
  fournisseurss: Array<Fournisseur> = [];

  fournisseur: Fournisseur = {};
  fournisseursPage: Page<Fournisseur> = initPage;
  fournisseursPages: Page<Fournisseur> = initPage;

  pageNumber = 0;
  pageSize = 10;
  filter = "";
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  file: File | null = null;

  constructor(
    private fournisseursService: FournisseursService,
    private filesService: FilesService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {}

  sortByCodeValid: boolean = true;
  sortByCode() {
    console.log("aa::",this.sortByCodeValid)
    if (this.sortByCodeValid) {
      this.fournisseurs.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.fournisseurs.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }
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
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.fournisseursService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.fournisseurs = result.content;
          this.fournisseursPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }


  findArchivedPage() {
    this.loading = true;
    this.fournisseursService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.fournisseurss = result.content;
          this.fournisseursPages = result;
          console.log("7:",result)
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

  onCancel() {
    this.fournisseur = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    console.log(this.fournisseur)
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      { id: "0" }
    );
    console.log("this.fournisseur",this.fournisseur)
    this.fournisseursService.save(id, {...this.fournisseur,vendorSKU:this.fournisseur.vendorSKU.id}).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("vendor"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("vendor"),
          })
        );
      },
    });
  }

  onDownloadCSVTempalte() {
    this.fournisseursService.downloadCSVTemplate().subscribe({
      next: (data) =>
        this.filesService.download(
          data,
          this.translateService.instant("menu.vendors") + ".csv"
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
    this.fournisseursService.uploadCSVTemplate(formData).subscribe(
       () => {
        this.toastService.close("0");
        this.importModal.hide();
        this.findPage();
        this.file = null;
        this.toastService.success(
          this.translateService.instant("success.imported", {
            elem: this.translateService.instant("menu.vendors"),
          })
        );
      },
      (error) => {
        console.log('error',error.status)
        if(error.status=="200"){
          console.log('succes')
          this.importModal.hide();
          this.findPage();
          this.file = null;
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.imported", {
              elem: this.translateService.instant("menu.products"),
            })
          );
        }else{
          this.toastService.close("0");
          this.toastService.error(this.translateService.instant(error.error));
        }
      },
    );
  }

  openImportModal() {
    this.importModal.show({
      title: "menu.import-vendors",
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
      title: "menu.add-vendor",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-vendor",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  
  
  onClickdisArchive(id: string) {
    this.fournisseursService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("menu.vendors"),
          })
        );
        console.log(id);
      },
    });
  }
 
  
  onClickDelete(id: string) {
    console.log("88888",id)
    this.fournisseursService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
 
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("menu.vendors"),
          })
        );
      },
    });
  }




  onClickArchive(id: string) {
    console.log(id)
    this.archiveModal.show(() => {
      this.fournisseursService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();

          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("vendor"),
            })
          );
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

  







  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.fournisseurs.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.fournisseurs.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }

  sortByemailValid: boolean = true;
  sortByemail() {
    if (this.sortByemailValid) {
      this.fournisseurs.sort((a, b) => a.email.localeCompare(b.email));
      this.sortByemailValid = false
    } else {
      this.fournisseurs.sort((a, b) => b.email.localeCompare(a.email));
      this.sortByemailValid = true
    }
  }


  sortByTypeValid: boolean = true;
  sortByType() {
    if (this.sortByTypeValid) {
      this.fournisseurs.sort((a, b) => (a.type || "").localeCompare((b.type || "")));
      this.sortByTypeValid = false
    } else {
      this.fournisseurs.sort((a, b) => (b.type || "").localeCompare((a.type || "")));
      this.sortByTypeValid = true
    }
  }

  sortByphoneValid: boolean = true;
  sortByphone() {
    if (this.sortByphoneValid) {
      this.fournisseurs.sort((a, b) => (a.phone || "").localeCompare((b.phone || "")));
      this.sortByphoneValid = false
    } else {
      this.fournisseurs.sort((a, b) => (b.phone || "").localeCompare((a.phone || "")));
      this.sortByphoneValid = true
    }
  }


  sortBynameCityValid: boolean = true;
  sortBynameCity() {
    if (this.sortBynameCityValid) {
      this.fournisseurs.sort((a, b) => (a.nameCity || "").localeCompare((b.nameCity || "")));
      this.sortBynameCityValid = false
    } else {
      this.fournisseurs.sort((a, b) => (b.nameCity || "").localeCompare((a.nameCity || "")));
      this.sortBynameCityValid = true
    }
  }
}
