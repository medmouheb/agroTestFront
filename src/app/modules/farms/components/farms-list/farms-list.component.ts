import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";

import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { initPage, Page } from "app/shared/models";
import { Farm } from "../../models/farm";
import { FarmsService } from "../../services/farms.service";
import { SharedService } from "app/modules/company/services/shared.service";

@Component({
  selector: "app-farms-list",
  templateUrl: "./farms-list.component.html",
  styleUrls: ["./farms-list.component.scss"],
})
export class FarmsListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  fermeFormGroup!: FormGroup;

  currentStep = 0;
  steps: any = [
    "steps.general",
    "steps.localisation",
    "steps.productAndLandUsed",
    "steps.planning",
    "steps.feedMill",
    "steps.LiveHaul",
    "steps.Projection",
    "Paye",
    "steps.Distance",
    "steps.contract",
    "steps.visitors",

  ];

  loading = false;
  farms: Array<Farm> = [];
  farmss: Array<Farm> = [];

  farm: Farm = {};
  farmsPage: Page<Farm> = initPage;
  farmsPages: Page<Farm> = initPage;

  companyss: Array<Farm> = [];
  pageNumber = 0;
  pageSize = 10;
  filter = "";
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;
  affiche: boolean = false;

  constructor(
    private sharedService: SharedService,
    private farmsService: FarmsService,
    private translateService: TranslateService,
    private toastService: HotToastService
  ) { }

  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => {this.findPage();this.findArchivedPage()});
  }

  findPage() {
    this.loading = true;
    this.farmsService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log("a::", result)
          this.farms = result.content;
          this.farmsPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickdisArchive(id: string) {
    console.log(id);

    this.farmsService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("farms"),
          })
        );
        console.log(id);
      },
    });
  }

  onClickDelete(id: string) {
    console.log("id: " + id);
    this.farmsService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("farms"),
          })
        );
      },
    });
  }

  onCheckboxChange() {
    console.log("La valeur de la case à cocher est : ", this.isChecked);
    if (this.isChecked == false) {

      this.affiche = false
    }
    else {
      this.affiche = true
    }
  }

  findById(id: string) {
    this.farmsService.findById(id).subscribe({
      next: (result) => (this.farm = result),
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
    this.farm = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    console.log("eee::", this.farm)

    if (this.farm.warehouse == undefined) {
      this.farm.warehouse = null;
    } else if (Object.keys(this.farm.warehouse).length == 0) {
      this.farm.warehouse = null;
    }

    if (this.farm.vendor == undefined) {
      this.farm.vendor = null;
    } else if (Object.keys(this.farm.vendor).length == 0) {
      this.farm.vendor = null;
    }
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    this.farmsService.save(id, this.farm!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("farm"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("farm"),
          })
        );
      },
    });
  }

  onWizardSave(id: string | null) {

    if (this.stepper.lastStep()) {

      this.onSave(id);
      return;
    }
    this.stepper.nextStep();
    let a = document.getElementsByClassName("modal-content")[0] as HTMLElement
    a.style.height = "1680px"
  }

  onStepChange(step: number) {
    this.currentStep = step;
  }

  onClickAdd() {
    this.sharedService.setIsActive(false);
    this.farm ={}

    this.farm.status=true
    this.farm.land=100
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();      

    }, 100)
    setTimeout(() => {

    this.formModal.show({
      title: "menu.add-farm",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }, 200)


  }

  onClickEdit(id: string) {
    this.findById(id);

    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.edit-farm",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);

  }

  sortByNameValid: boolean = true;
  sortByName() {
    if(this.affiche==true){
      if (this.sortByNameValid) {
        this.farmss.sort((a, b) => a.nom.localeCompare(b.nom));
        this.sortByNameValid = false
      } else {
        this.farmss.sort((a, b) => b.nom.localeCompare(a.nom));
        this.sortByNameValid = true
      }
    }else{
      if (this.sortByNameValid) {
        this.farms.sort((a, b) => a.nom.localeCompare(b.nom));
        this.sortByNameValid = false
      } else {
        this.farms.sort((a, b) => b.nom.localeCompare(a.nom));
        this.sortByNameValid = true
      }
    }

  }


  sortByCityNameValid: boolean = true;
  sortByCode() {
    if(this.affiche==true){
      if (this.sortByCityNameValid) {
        this.farmss.sort((a, b) => (a.code || "").localeCompare((b.code || "")));
        this.sortByCityNameValid = false
      } else {
        this.farmss.sort((a, b) => (b.code || "").localeCompare((a.code || "")));
        this.sortByCityNameValid = true
      }
    }else{
      if (this.sortByCityNameValid) {
        this.farms.sort((a, b) => (a.code || "").localeCompare((b.code || "")));
        this.sortByCityNameValid = false
      } else {
        this.farms.sort((a, b) => (b.code || "").localeCompare((a.code || "")));
        this.sortByCityNameValid = true
      }
    }

  }
  sortBywillayaValid: boolean = true;
  sortByType() {
    if(this.affiche==true){
      if (this.sortBywillayaValid) {
        this.farmss.sort((a, b) => (a.type || "").localeCompare((b.type || "")));
        this.sortBywillayaValid = false
      } else {
        this.farmss.sort((a, b) => (b.type || "").localeCompare((a.type || "")));
        this.sortBywillayaValid = true
      }
    }else{
      if (this.sortBywillayaValid) {
        this.farms.sort((a, b) => (a.type || "").localeCompare((b.type || "")));
        this.sortBywillayaValid = false
      } else {
        this.farms.sort((a, b) => (b.type || "").localeCompare((a.type || "")));
        this.sortBywillayaValid = true
      }
    }

  }


  sortByAddressValid: boolean = true;
  sortByOwner() {
    if(this.affiche==true){
      if (this.sortByAddressValid) {
        this.farmss.sort((a, b) => (a.owner_Name || "").localeCompare((b.owner_Name || "")));
        this.sortByAddressValid = false
      } else {
        this.farmss.sort((a, b) => (b.owner_Name || "").localeCompare((a.owner_Name || "")));
        this.sortByAddressValid = true
      }
    }else{
      if (this.sortByAddressValid) {
        this.farms.sort((a, b) => (a.owner_Name || "").localeCompare((b.owner_Name || "")));
        this.sortByAddressValid = false
      } else {
        this.farms.sort((a, b) => (b.owner_Name || "").localeCompare((a.owner_Name || "")));
        this.sortByAddressValid = true
      }

    }

  }

  // onClickDelete(id: string) {
  //   this.deleteModal.show(() => {
  //     this.toastService.loading(
  //       this.translateService.instant("message.loading..."),
  //       {
  //         id: "0",
  //       }
  //     );
  //     this.farmsService.delete(id).subscribe({
  //       next: () => {
  //         this.findPage();
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.onFilterChange("");
  //         this.toastService.success(
  //           this.translateService.instant("success.deleted", {
  //             elem: this.translateService.instant("farm"),
  //           })
  //         );
  //       },
  //       error: (error) => {
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.error(
  //           this.translateService.instant(error.error, {
  //             elem: this.translateService.instant("farm"),
  //           })
  //         );
  //       },
  //     });
  //   });
  // }


  findArchivedPage() {
    this.loading = true;
    this.farmsService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log("b::", result)
          this.farmss = result.content;
          this.farmsPages = result;
          this.companyss = result.content;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.farmsService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("farms"),
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

  // onClickArchive(id: string) {
  //   this.archiveModal.show(() => {
  //     this.farmsService.archive(id).subscribe({
  //       next: () => {
  //         //   this.findPage();
  //         this.archiveModal.hide();
  //         //   this.toastService.close("0");
  //         this.toastService.success;
  //         console.log(id);

  //         //   console.log(id);
  //       },
  //       // error: (error) => {
  //       //   this.archiveModal.hide();
  //       //   this.toastService.close("0");
  //       //   this.toastService.error(
  //       //     this.translateService.instant(error.error, {
  //       //       elem: this.translateService.instant("growout"),
  //       //     })
  //       //   );
  //       // },
  //     });
  //   });
  // }
}