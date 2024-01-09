import { Component, OnInit, ViewChild ,EventEmitter} from '@angular/core';

import { VehicleTypeService } from '../../service/vehicle-type.service';
import { VihicleType } from '../../models/vehicleType';


import { Page, initPage } from "app/shared/models";
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { DialogComponent } from "@progress/kendo-angular-dialog";
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.scss']
})
export class VehicleTypeListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading = false;

  vehicleTypeList: Array<VihicleType> = [];
  vehicleTypePage: Page<VihicleType> = initPage;

  vehicleTypeListArchived: Array<VihicleType> = [];
  vehicleTypePageArchived: Page<VihicleType> = initPage;



  pageNumber=0

  pageSize=10


  vehicleType:VihicleType={}


  filter=""

  

  isChecked: boolean = false;
  affiche:boolean = false;
  currentStep = 0;

  steps: any = ["steps.general","steps.general"];

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(private translateService: TranslateService,    private toastService: HotToastService,
    private vehicleTypeService:VehicleTypeService) { }

  ngOnInit(): void {
    this.findPage()
    this.findArchivedPage()
  }

  findById(id: string) {
    this.vehicleTypeService.findById(id).subscribe({
      next: (result) => {
        
        this.vehicleType = result
        

      },
      error: (error) => console.error(error),
    });
  }


  onClickEdit(id: string) {
    this.findById(id);
    this.stepper.nextStep();
    setTimeout(() => {
      this.stepper.prevStep();

    }, 100);
    setTimeout(()=>{
      this.formModal.show({
        title: "menu.add-vehicleType",
        stepsCount: this.steps.length - 1,
        confirm: () => this.onWizardSave(id),
        cancel: () => this.onCancel(),
        prev: () => this.stepper.prevStep(),
      });
    },500)
    
  }
  onCancel() {
    this.vehicleType = {};
    this.currentStep = 0;
  }

  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );

    this.vehicleTypeService.save(id, this.vehicleType!).subscribe({
      next: () => {
        this.findPage();
        this.formModal.hide();
        this.onCancel();
        this.toastService.close("0");
        this.toastService.success(
          this.translateService.instant("success.saved", {
            elem: this.translateService.instant("vehicleType"),
          })
        );
      },
      error: (error) => {
        this.toastService.close("0");
        this.toastService.error(
          this.translateService.instant(error.error, {
            elem: this.translateService.instant("vehicleType"),
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

  onCheckboxChange() {
    
    if (this.isChecked==false){

      this.affiche=false
    }
    else{
      this.affiche=true
    }
  }

  onFilterChange(e:any){
    this.pageNumber=0
    this.filter=e
    this.findPage()
    this.findArchivedPage()
  }

  findPage() {
    this.loading = true;
    this.vehicleTypeService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          
          this.vehicleTypeList = result.content;
          this.vehicleTypePage = result;

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
    this.vehicleTypeService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          

          this.vehicleTypeListArchived = result.content;
          
          this.vehicleTypePageArchived = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }
  onStepChange(step: number) {
    this.currentStep = step;
  }

  sortByCodeValid: boolean = true;
  sortByCode() {
    if (this.sortByCodeValid) {
      this.vehicleTypeList.sort((a, b) => a.vehicleTypeCode.localeCompare(b.vehicleTypeCode));
      this.sortByCodeValid = false
    } else {
      this.vehicleTypeList.sort((a, b) => b.vehicleTypeCode.localeCompare(a.vehicleTypeCode));
      this.sortByCodeValid = true
    }
  }
  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.vehicleTypeList.sort((a, b) => a.vehicleTypeName.localeCompare(b.vehicleTypeName));
      this.sortByNameValid = false
    } else {
      this.vehicleTypeList.sort((a, b) => b.vehicleTypeName.localeCompare(a.vehicleTypeName));
      this.sortByNameValid = true
    }
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

  onClickDelete(id: string) {
    this.vehicleTypeService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage();
        
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("vehicleType"),
          })
        );
      },
    });
  }

  onClickdisArchive(id: string) {
    this.vehicleTypeService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();
        this.findPage()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("vehicleType"),
          })
        );
        
      },
    });
  }

  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.vehicleTypeService.archive(id).subscribe({
        next: () => {
          this.findPage();
          this.findArchivedPage()
          this.archiveModal.hide();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.deleted", {
              elem: this.translateService.instant("vehicleType"),
            })
          );
        },
      });
    });
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-vehicleType",
      stepsCount: this.steps.length - 1,
      confirm: () => this.onWizardSave(null),
      cancel: () => this.onCancel(),
      prev: () => this.stepper.prevStep(),
    });
  }

}
