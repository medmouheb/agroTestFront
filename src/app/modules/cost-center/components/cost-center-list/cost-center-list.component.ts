import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  ViewChild,
} from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";

import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";
import { Page, initPage } from "app/shared/models";
import { CostCenter } from "../../model/cost-center";
import { CostCenterService } from "../../services/cost-center.service";

@Component({
  selector: "app-cost-center-list",
  templateUrl: "./cost-center-list.component.html",
  styleUrls: ["./cost-center-list.component.scss"],
})
export class CostCenterListComponent implements OnInit {
  @ViewChild("formtest")
  Cost!: ElementRef;
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  costCenter: CostCenter = {};
  costCenters: Array<CostCenter> = [];
  costCenterss: Array<CostCenter> = [];
  loading = false;
  costCenterPage: Page<CostCenter> = initPage;
  costCenterPages: Page<CostCenter> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;
  affiche:boolean = false;
  errormessage: string;
  CostcenterFormGroup!: FormGroup;
  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor(
    private costcenterServive: CostCenterService,
    private translateService: TranslateService,
    private toastService: HotToastService,

    private fb: FormBuilder
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
    this.findArchivedPage()
    this.onPaginationChange.subscribe(() => this.findPage());
    // this.CostcenterFormGroup = this.fb.group({
    // code: ["", Validators.required],
    // name: ["", Validators.required],
    // });
  }

  onStepChange(step: number) {
    this.currentStep = step;
  }

  // onSubmit() {
  //   let costcenter: CostCenter = this.CostcenterFormGroup.value;
  //   console.log(costcenter);
  //   this.costcenterServive.create(costcenter).subscribe({
  //     next: (data) => {
  //       alert("costcenter saved");
  //     },
  //     error: (err) => {
  //       this.errormessage = err.error.message;
  //     },
  //   });
  // }



  findById(id: string) {
    this.costcenterServive.findById(id).subscribe({
      next: (result) => (this.costCenter = result),
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
    this.costCenter = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    this.costcenterServive.save(id, this.costCenter!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("costCenter"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("costCenter"),
          })
        );
      },
    });
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-costcenter",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }
  onClickEdit(id: string) {
    this.findById(id);

    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    setTimeout(() => {
      this.formModal.show({
        title: "menu.edit-costcenter",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    }, 200);

  }

  

  // onClickDelete(id: string) {
  //   this.deleteModal.show(() => {
  //     this.toastService.loading(
  //       this.translateService.instant("message.loading..."),
  //       {
  //         id: "0",
  //       }
  //     );
  //     this.costcenterServive.delete(id).subscribe({
  //       next: () => {
  //         this.findPage();
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.success(
  //           this.translateService.instant("success.deleted", {

  //             elem: this.translateService.instant("costCenter"),
  //           })
  //         );
  //       },
  //       error: (error) => {
  //         this.findPage();
  //         this.deleteModal.hide();
  //         this.toastService.close("0");
  //         this.toastService.error(
  //           this.translateService.instant(error.error, {
  //             elem: this.translateService.instant("costCenter"),
  //           })
  //         );
  //       },
  //     });
  //   });
  // }

  onWizardSave(id: string | null) {
    if (this.stepper.lastStep()) {
      this.onSave(id);
      return;
    }
    this.stepper.nextStep();
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.costcenterServive.archive(id).subscribe({
        next: () => {
            this.findPage();
            this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.success(
            this.translateService.instant("success.deleted", {

              elem: this.translateService.instant("costCenter"),
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
      this.costCenters.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.costCenters.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }



  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.costCenters.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.costCenters.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }





//trash 
findArchivedPage() {
  this.loading = true;
  this.costcenterServive
    .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
    .subscribe({
      next: (result) => {
        this.costCenterss = result.content;
        this.costCenterPages = result;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
}
findPage() {
  this.loading = true;
  this.costcenterServive
    .findPage(this.pageNumber, this.pageSize, this.filter)
    .subscribe({
      next: (result) => {
        this.costCenters = result.content;
        this.costCenterPage = result;
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
}





onClickdisArchive(id: string) {
  this.costcenterServive.disArchive(id).subscribe({
    next: () => {
      this.findArchivedPage();
      this.findPage()

      this.toastService.success(
        this.translateService.instant("success.restore", {
          elem: this.translateService.instant("costCenter"),
        })
      );
      console.log(id);
    },
  });
}
onClickDelete(id: string) {
  this.costcenterServive.delete(id).subscribe({
    next: () => {
      this.findArchivedPage();
      console.log("Success");
      this.toastService.success(
        this.translateService.instant("success.deleted", {
          elem: this.translateService.instant("costCenter"),
        })
      );
    },
  });
}









 
}
