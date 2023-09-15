import { Component, OnInit, ViewChild, EventEmitter } from "@angular/core";
import { DialogComponent } from "@progress/kendo-angular-dialog";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Growout } from "../../models/growout";
import { Page, initPage } from "app/shared/models";
import { GrowoutService } from "../../services/growout.service";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-growout-list",
  templateUrl: "./growout-list.component.html",
  styleUrls: ["./growout-list.component.scss"],
})
export class GrowoutListComponent implements OnInit {
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
  isChecked: boolean = false;
  affiche:boolean = false;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  growout: Growout = {};
  growouts: Array<Growout> = [];
  growoutss: Array<Growout> = [];
  loading = false;
  growoutPage: Page<Growout> = initPage;
  growoutPages: Page<Growout> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor(
    private growoutService: GrowoutService,
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
    this.findArchivedPage();
    this.onPaginationChange.subscribe(() => this.findPage());
  }

  findPage() {
    this.loading = true;
    this.growoutService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log("z;",result)
          this.growouts = result.content;
          this.growoutPage = result;
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
    this.growoutService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          console.log(result.content)

          this.growoutss = result.content;
          console.log(this.growouts)
          this.growoutPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.growoutService.findById(id).subscribe({
      next: (result) => (this.growout = result),
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
    this.growout = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    this.growoutService.save(id, this.growout!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("growout"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("growout"),
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
  }

  onStepChange(step: number) {
    this.currentStep = step;
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-growout",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-growout",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(id),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

 

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.growoutService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage();
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("growout"),
            })
          );
          // this.toastService.success;
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
      this.growouts.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.growouts.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.growouts.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.growouts.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }
  sortBydiviValid: boolean = true;
  sortBydivi() {
    if (this.sortBydiviValid) {
      this.growouts.sort((a, b) => a.divisionName.localeCompare(b.divisionName));
      this.sortBydiviValid = false
    } else {
      this.growouts.sort((a, b) => b.divisionName.localeCompare(a.divisionName));
      this.sortBydiviValid = true
    }
  }

  sortByCityNameValid: boolean = true;
  sortByCityName() {
    if (this.sortByCityNameValid) {
      this.growouts.sort((a, b) => (a.nameCity || "").localeCompare((b.nameCity || "")));
      this.sortByCityNameValid = false
    } else {
      this.growouts.sort((a, b) => (b.nameCity || "").localeCompare((a.nameCity || "")));
      this.sortByCityNameValid = true
    }
  }
  sortBywillayaValid: boolean = true;

  sortBywillaya() {
    if (this.sortBywillayaValid) {
      this.growouts.sort((a, b) => (a.wilayaName || "").localeCompare((b.wilayaName || "")));
      this.sortBywillayaValid = false
    } else {
      this.growouts.sort((a, b) => (b.wilayaName || "").localeCompare((a.wilayaName || "")));
      this.sortBywillayaValid = true
    }
  }

  sortByAddressValid: boolean = true;
  sortByAddress() {
    if (this.sortByAddressValid) {
      this.growouts.sort((a, b) => (a.address || "").localeCompare((b.address || "")));
      this.sortByAddressValid = false
    } else {
      this.growouts.sort((a, b) => (b.address || "").localeCompare((a.address || "")));
      this.sortByAddressValid = true
    }
  }

  onClickdisArchive(id: string) {
    this.growoutService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("growout"),
          })
        );
        console.log(id);
      },
    });
  }
  onClickDelete(id: string) {
    this.growoutService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("growout"),
          })
        );
      },
    });
  }
}
