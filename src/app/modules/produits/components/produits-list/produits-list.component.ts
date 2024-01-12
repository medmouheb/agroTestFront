import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Produit } from "../../models/produit.model";
import { ProduitsService } from "../../services/produits.service";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-produits-list",
  templateUrl: "./produits-list.component.html",
  styleUrls: ["./produits-list.component.scss"],
})
export class ProduitsListComponent implements OnInit {


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
    "steps.productGroup",
    "steps.productUsage",
    "steps.vendorSKU",
    "steps.salesSKU",
  ];

  loading = false;
  produits: Array<Produit> = [];
  produitss: Array<Produit> = [];

  produit: Produit = {};
  produitsPage: Page<Produit> = initPage;
  produitsPages: Page<Produit> = initPage;

  pageNumber = 0;
  pageSize = 10;
  companyss: Array<Produit> = [];
  filter = "";
  isChecked: boolean = false;
  affiche:boolean = false;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  file: File | null = null;

  constructor(
    private produitsService: ProduitsService,
    private filesService: FilesService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => {this.findPage();this.findArchivedPage()});
  }

  onCheckboxChange() {
    if (this.isChecked==false){

      this.affiche=false
    }
    else{
      this.affiche=true
    }
  }

  findPage() {
    this.loading = true;
    this.produitsService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.produits = result.content;
          this.produitsPage = result;
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
    this.produitsService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.produitss = result.content;
          this.produitsPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.produitsService.findById(id).subscribe({
      next: (result) => (this.produit = result),
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
    this.produit = {
      fournisseur: {},
    };
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    this.produitsService.save(id, this.produit!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("product"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("product"),
          })
        );
      },
    });
  }

  onDownloadCSVTempalte() {
    this.produitsService.downloadCSVTemplate().subscribe({
      next: (data) =>
        this.filesService.download(
          data,
          this.translateService.instant("menu.products") + ".csv"
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
    this.produitsService.importCSV(formData).subscribe({
      next: () => {
        this.importModal.hide();
        this.findPage();
        this.file = null;
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.imported", {
            elem: this.translateService.instant("menu.products"),
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
      title: "menu.import-products",
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
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    setTimeout(() => {

    this.formModal.show({
      title: "menu.add-product",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }, 200);

  }

  onClickEdit(id: string) {
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    this.findById(id);
    setTimeout(() => {

    this.formModal.show({
      title: "menu.edit-product",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }, 200);

  }

  onClickDelete(id: string) {
    this.produitsService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("product"),
          })
        );
      },
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.produitsService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.success;

        },
      });
    });
  }



  onClickdisArchive(id: string) {
    this.produitsService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("product"),
          })
        );
      },
    });
  }


  sortByCodeValid: boolean = true;
  sortByCode() {
    if(this.affiche){
      if (this.sortByCodeValid) {
        this.produitss.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.produitss.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }
    }else{
      if (this.sortByCodeValid) {
        this.produits.sort((a, b) => a.code.localeCompare(b.code));
        this.sortByCodeValid = false
      } else {
        this.produits.sort((a, b) => b.code.localeCompare(a.code));
        this.sortByCodeValid = true
      }
    }

  }



  sortByNameValid: boolean = true;
  sortByName() {
    if(this.affiche){
      if (this.sortByNameValid) {
        this.produitss.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.produitss.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    }else{
      if (this.sortByNameValid) {
        this.produits.sort((a, b) => a.name.localeCompare(b.name));
        this.sortByNameValid = false
      } else {
        this.produits.sort((a, b) => b.name.localeCompare(a.name));
        this.sortByNameValid = true
      }
    }

  }


  sortByCityNameValid: boolean = true;
  sortByCategorie() {
    if(this.affiche){
      if (this.sortByCityNameValid) {
        this.produitss.sort((a, b) => (a.category || "").localeCompare((b.category|| "")));
        this.sortByCityNameValid = false
      } else {
        this.produitss.sort((a, b) => (b.category|| "").localeCompare((a.category|| "")));
        this.sortByCityNameValid = true
      }
    }else{
      if (this.sortByCityNameValid) {
        this.produits.sort((a, b) => (a.category || "").localeCompare((b.category|| "")));
        this.sortByCityNameValid = false
      } else {
        this.produits.sort((a, b) => (b.category|| "").localeCompare((a.category|| "")));
        this.sortByCityNameValid = true
      }
    }
  }
  sortBywillayaValid: boolean = true;
  sortByprixUnitaireHt() {
    if(this.affiche){
      if (this.sortBywillayaValid) {
        this.produitss.sort((a, b) => (a.statuss + "").localeCompare((b.statuss + "")));
        this.sortBywillayaValid = false
      } else {
        this.produitss.sort((a, b) => (b.statuss + "").localeCompare((a.statuss + "")));
        this.sortBywillayaValid = true
      }
    }else{
      if (this.sortBywillayaValid) {
        this.produits.sort((a, b) => (a.statuss + "").localeCompare((b.statuss + "")));
        this.sortBywillayaValid = false
      } else {
        this.produits.sort((a, b) => (b.statuss + "").localeCompare((a.statuss + "")));
        this.sortBywillayaValid = true
      }
    }

  }
  sortBywillayaValida: boolean = true;
  sortByprixUnitaireHta() {
    if(this.affiche){
      if (this.sortBywillayaValida) {
        this.produitss.sort((a, b) => (a.prixUnitaireHt +"" ).localeCompare((b.prixUnitaireHt +"" )));
        this.sortBywillayaValida = false
      } else {
        this.produitss.sort((a, b) => (b.prixUnitaireHt +"" ).localeCompare((a.prixUnitaireHt +"" )));
        this.sortBywillayaValida = true
      }
    }else{
      if (this.sortBywillayaValida) {
        this.produits.sort((a, b) => (a.prixUnitaireHt +"" ).localeCompare((b.prixUnitaireHt +"" )));
        this.sortBywillayaValida = false
      } else {
        this.produits.sort((a, b) => (b.prixUnitaireHt  +"").localeCompare((a.prixUnitaireHt  +"")));
        this.sortBywillayaValida = true
      }
    }

  }


  sortByAddressValid: boolean = true;
  sortByAddress() {
    if(this.affiche){
      if (this.sortByAddressValid) {
        this.produitss.sort((a, b) => (a.tauxTva + "").localeCompare((b.tauxTva + "")));
        this.sortByAddressValid = false
      } else {
        this.produitss.sort((a, b) => (b.tauxTva + "").localeCompare((a.tauxTva + "")));
        this.sortByAddressValid = true
      }
    }else{
      if (this.sortByAddressValid) {
        this.produits.sort((a, b) => (a.tauxTva + "").localeCompare((b.tauxTva + "")));
        this.sortByAddressValid = false
      } else {
        this.produits.sort((a, b) => (b.tauxTva + "").localeCompare((a.tauxTva + "")));
        this.sortByAddressValid = true
      }
    }

  }

  sortByEmailValid: boolean = true;
  sortByEmail() {
    if (this.sortByEmailValid) {
      this.produits.sort((a, b) => (a.prixUnitaireTtc || "").localeCompare((b.prixUnitaireTtc || "")));
      this.sortByEmailValid = false
    } else {
      this.produits.sort((a, b) => (b.prixUnitaireTtc || "").localeCompare((a.prixUnitaireTtc || "")));
      this.sortByEmailValid = true
    }
  }




}
