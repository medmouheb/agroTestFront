import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { Page, initPage } from 'app/shared/models';
import { Growout } from '../models/growout';
import { GrowoutService } from '../services/growout.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashGComponent implements OnInit {
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

  growout: Growout = {};
  growouts: Array<Growout> = [];
  Page: Page<Growout> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private growoutService: GrowoutService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.findArchivedPage();
    
    this.onPaginationChange.subscribe(() => this.findArchivedPage());
  }
  findArchivedPage() {
    this.loading = true;
    this.growoutService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.growouts = result.content;
          
          this.Page = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }
  goto(){
    this.router.navigateByUrl("/growout")
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

  onClickdisArchive(id: string) {
    this.growoutService.disArchive(id).subscribe({
      next: () => {
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("growout"),
          })
        );
        
      },
    });
  }






































  onClickDelete(id: string) {
    this.growoutService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("growout"),
          })
        );
      },
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

}
 