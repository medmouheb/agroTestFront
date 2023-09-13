import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { FilesService } from "app/shared/services/files/files.service";
import { Warehouse } from "../../models/warehouse.model";
import { WarehouseService } from "../../services/warehouse.service";

@Component({
  selector: "app-warehouse-list",
  templateUrl: "./warehouse-list.component.html",
  styleUrls: ["./warehouse-list.component.scss"],
})
export class WarehouseListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;
  @ViewChild("importModal")
  importModal!: DialogComponent;
  currentStep = 0;
  steps = ["General", "Projection"];
  isChecked: boolean = false;
  affiche: boolean = false;
  myForm: FormGroup;
  loading = false;
  warehouses: Array<Warehouse> = [];
  warehousess: Array<Warehouse> = [];

  warehouse: Warehouse = {};
  warehousesPage: Page<Warehouse> = initPage;

  pageNumber = 0;
  pageSize = 10;
  filter = "";
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  file: File | null = null;
  Pagewarehouse: Page<Warehouse> = initPage;
  Pagewarehouses: Page<Warehouse> = initPage;
  constructor(
    private warehouseService: WarehouseService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private filesService: FilesService,
    private fb: FormBuilder
  ) { }
  onCheckboxChange() {
    console.log("La valeur de la case à cocher est : ", this.isChecked);
    if (this.isChecked == false) {

      this.affiche = false
    }
    else {
      this.affiche = true
    }
  }

  ngOnInit(): void {
    this.findArchivedPage();
    this.findPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  onDownloadCSVTempalte() {
    this.warehouseService.downloadCSVTemplate().subscribe({
      next: (data) =>
        this.filesService.download(
          data,
          this.translateService.instant("menu.warehouse") + ".csv"
        ),
      error: (error) => console.error(error),
    });
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
    console.log('entred')

    this.warehouseService.uploadCSVTemplate(formData).subscribe(() => {
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

        
      })
    
  }

  findPage() {
    this.loading = true;
    this.warehouseService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.warehouses = result.content;
          this.warehousesPage = result;
          console.log('findPage', result)
        },

        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.warehouseService.findById(id).subscribe({
      next: (result) => (this.warehouse = result),
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
    this.warehouse = {};
    this.currentStep = 0;
  }


  onSave(id: string | null) {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(this.warehouse.email)
    if (emailRegex.test(this.warehouse!.email)) {
      this.toastService.close("0");
      this.toastService.warning("Verify your email "

      );

    }
    else {
      console.log(this.warehouse!)
      this.toastService.loading(
        this.translateService.instant("message.loading..."),
        {
          id: "0",
        }
      );
      console.log(this.warehouse)
      this.warehouseService.save(id, this.warehouse!).subscribe({
        next: () => {
          this.findPage();
          this.formModal.hide();
          this.onCancel();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.saved", {
              elem: this.translateService.instant("warehouse"),
            })
          );
        },
        error: (error) => {
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("warehouse"),
            })
          );
        },
      });
    }


  }
  openImportModal() {
    this.importModal.show({
      title: "menu.import-warehouse",
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
      title: "menu.add-warehouse",

      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
      stepsCount: this.steps.length - 1,
    });
  }

  onClickEdit(id: string) {

    this.findById(id);
    console.log(this.findById(id))
    this.formModal.show({
      title: "menu.edit-warehouse",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }


  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.warehouseService.archive(id).subscribe({
        next: () => {
          this.findArchivedPage();
          this.findPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("warehouse"),
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

  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.warehouses.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.warehouses.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }

  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.warehouses.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.warehouses.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }
  sortcostCenterName: boolean = true;
  sortBycostCenterName() {
    if (this.sortcostCenterName) {
      this.warehouses.sort((a, b) => a.costCenterName.localeCompare(b.costCenterName));
      this.sortcostCenterName = false
    } else {
      this.warehouses.sort((a, b) => b.costCenterName.localeCompare(a.costCenterName));
      this.sortcostCenterName = true
    }
  }

  sortBydivisionNameValid: boolean = true;
  sortBydivisionName() {
    // if(this.sortBydivisionNameValid){
    //   this.warehouses.sort((a, b) => a.divisionName.localeCompare(b.divisionName));
    //   this.sortBydivisionNameValid=false
    // }else{
    //   this.warehouses.sort((a, b) => b.divisionName.localeCompare(a.divisionName));
    //   this.sortBydivisionNameValid=true
    // }
  }


  sortBycityNameValid: boolean = true;
  sortBycityName() {
    if (this.sortBycityNameValid) {
      this.warehouses.sort((a, b) => a.cityName.localeCompare(b.cityName));
      this.sortBycityNameValid = false
    } else {
      this.warehouses.sort((a, b) => b.cityName.localeCompare(a.cityName));
      this.sortBycityNameValid = true
    }
  }

  sortByemailValid: boolean = true;
  sortByemail() {
    if (this.sortByemailValid) {
      this.warehouses.sort((a, b) => a.email.localeCompare(b.email));
      this.sortByemailValid = false
    } else {
      this.warehouses.sort((a, b) => b.email.localeCompare(a.email));
      this.sortByemailValid = true
    }
  }
  sortByphoneNumberValid: boolean = true;
  sortByphoneNumber() {
    if (this.sortByphoneNumberValid) {
      this.warehouses.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
      this.sortByphoneNumberValid = false
    } else {
      this.warehouses.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber));
      this.sortByphoneNumberValid = true
    }
  }



  onCSVChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (!fileList) {
      return;
    }
    this.file = fileList[0];    
  }


  findArchivedPage() {
    this.loading = true;
    this.warehouseService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.warehousess = result.content;
          this.Pagewarehouses = result;
          console.log('findArchivedPage', result)

        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickDelete(id: string) {
    this.warehouseService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("warehouse"),
          })
        );
      },
    });
  }
  onClickdisArchive(id: string) {
    this.warehouseService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("warehouse"),
          })
        );
        console.log(id);
      },
    });
  }
}
