import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { WizardDialogComponent } from 'app/shared/components/wizard-dialog/wizard-dialog.component';
import { airport } from '../../models/airport.model';
import { TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngneat/hot-toast';
import { airportService } from '../../Services/airport.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;

  @ViewChild("deletePermaModal")
  deletePermaModal!: ConfirmDialogComponent;


  @ViewChild("dearchivedModal")
  dearchivedModal!: ConfirmDialogComponent;

  @ViewChild("formModal")
  formModal!: WizardDialogComponent;

  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading?= false;
  pageNumber = 0;
  pageSize = 10;
  filter = "";

  airport: airport = {};
  airports: Array<airport> = [];
  airportName: string = "";




  constructor(
    private translateService: TranslateService,
    private toastService: HotToastService,
    private service: airportService
  ) { }


  isChecked: boolean = true;


  onCheckboxChange() {
    window.location.href="/agrotechsolutions.pro#/airports"
  }

  ngOnInit(): void {
    this.getArchivedAirports()

  }
  getArchivedAirports() {
    this.loading = true;
    this.service.getArchivedAirports().subscribe({
      next: (result) => {
        this.airports = result;
        
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
  }


















  findById(id: string) {
    this.service.findAirportById(id).subscribe({
      next: (result) => (this.airport = result),
      error: (error) => console.error(error),
    });
  }





















































  onclickActivateModal(id: string) {
    this.service.ActivateAirport(id).subscribe({
      next: () => {
        this.getArchivedAirports()
        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("menu.vendors"),
          })
        );
        
      },
    });
  }

  onclickDeletePerma(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.getArchivedAirports()
 
        
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("menu.vendors"),
          })
        );
      },
    });
  }

































  searchByAirportName() {
    this.service.searchAirportByNameArchived(this.airportName).subscribe({
      next: (result) => {
        this.airports = result;
        
      },
      error: (error) => console.error(error),
    });
  }

  sortByAirportCodeValid: boolean = true;
  AirportCode() {
    if (this.sortByAirportCodeValid) {
      this.airports.sort((a, b) => a.airportCode.localeCompare(b.airportCode));
      this.sortByAirportCodeValid = false;
    } else {
      this.airports.sort((a, b) => b.airportCode.localeCompare(a.airportCode));
      this.sortByAirportCodeValid = true;
    }
  }

  sortByAirportNameValid: boolean = true;
  sortByAirportName() {
    if (this.sortByAirportNameValid) {
      this.airports.sort((a, b) => a.airportName.localeCompare(b.airportName));
      this.sortByAirportNameValid = false;
    } else {
      this.airports.sort((a, b) => b.airportName.localeCompare(a.airportName));
      this.sortByAirportNameValid = true;
    }
  }
  sortByNotesValid: boolean = true;
  sortByNotes() {
    if (this.sortByNotesValid) {
      this.airports.sort((a, b) => a.notes.localeCompare(b.notes));
      this.sortByNotesValid = false;
    } else {
      this.airports.sort((a, b) => b.notes.localeCompare(a.notes));
      this.sortByNotesValid = true;
    }
  }

}
