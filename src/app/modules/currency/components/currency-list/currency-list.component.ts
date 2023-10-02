import { Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { DialogComponent } from "app/shared/components/dialog/dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { Page, initPage } from "app/shared/models";
import { Currency } from "../../models/currency";
import { CurrencyService } from "../../services/currency.service";
import { SharedService } from "app/modules/company/services/shared.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-currency-list",
  templateUrl: "./currency-list.component.html",
  styleUrls: ["./currency-list.component.scss"],
})
export class CurrencyListComponent implements OnInit {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: DialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;
  filter = "";
  pageNumber = 0;
  pageSize = 10;
  currency: Currency = {};
  currencys: Array<Currency> = [];
  currencyss: Array<Currency> = [];
  loading = false;
  currencyPage: Page<Currency> = initPage;
  currencyPages: Page<Currency> = initPage;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  isChecked: boolean = false;
  affiche:boolean = false;
  currentStep = 0;
  steps: any = ["steps.general"];

  constructor(
    private sharedService: SharedService,
    private currencyService: CurrencyService,
    private translateService: TranslateService,
    private toastService: HotToastService,
    private http: HttpClient

  ) {}

  ngOnInit(): void {
    this.findPage();
    this.findArchivedPage();

    this.onPaginationChange.subscribe(() => this.findPage());
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
  findPage() {
    this.loading = true;
    this.currencyService
      .findPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.currencys = result.content;
          this.currencyPage = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }

  findById(id: string) {
    this.currencyService.findById(id).subscribe({
      next: (result) => (this.currency = result),
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
    this.currency = {};
    this.currentStep = 0;
  }
  // validationCode() {
  //   const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
  //   console.log(this.currency.code)
  //   if (codeRegex.test(this.currency.code)) {
  //     this.codeIsvalid = false;
  //     console.log(this.currency.code)
  //     this.sharedService.setIsActive(false);

  //   }
  //   else {
  //     this.codeIsvalid = true
  //     this.sharedService.setIsActive(true);

  //   }

  // }
  onSave(id: string | null) {
    this.toastService.loading(
      this.translateService.instant("message.loading..."),
      {
        id: "0",
      }
    );
    console.log(this.currency)
    if((this.currency.code==undefined) ||(this.currency.name==undefined) || 
    (this.currency.countrcode==undefined) || (this.currency.countryname==undefined) || (this.currency.digitalcode ==undefined) ){
      this.toastService.close("0");
      let lg = localStorage.getItem("locale")
      this.http.get("../../../../../assets/i18n/" + lg + ".json").subscribe((data: any) => {
        this.toastService.warning(data.verifycodenamecountrycodecountrynamedigitalcode)
      });
      
      return;
    }
    const codeRegex: RegExp = /^[a-zA-Z0-9]*$/;
    if (codeRegex.test(this.currency.code)){
      
      this.toastService.close("0");
      let lg = localStorage.getItem("locale")
      this.http.get("../../../../../assets/i18n/" + lg + ".json").subscribe((data: any) => {
        this.toastService.warning(data.formainvalid)
      });
      
      return;
    }









this.currencyService.findbycode(this.currency.code).subscribe((data)=>{
  console.log(data)
  if (data!=null){
    this.toastService.close("0");
    let lg = localStorage.getItem("locale")
    this.http.get("../../../../../assets/i18n/" + lg + ".json").subscribe((data: any) => {
      this.toastService.warning(data.verifycode)
    });

        
    return;
  }


      
      
},(error)=>{

  this.currencyService.findbyName(this.currency.name).subscribe((data)=>{
    console.log(data)
    if(data!=null){
      this.toastService.close("0");
      let lg = localStorage.getItem("locale")
      this.http.get("../../../../../assets/i18n/" + lg + ".json").subscribe((data: any) => {
        this.toastService.warning(data.verifyname)
      });
          
      return;
    }else {
      this.currencyService.save(id, this.currency!).subscribe({
        next: () => {
          this.findPage();
          this.formModal.hide ();
          this.onCancel();
          this.toastService.close("0");
          this.toastService.success(
            this.translateService.instant("success.saved", {
              elem: this.translateService.instant("currency"),
            })
          );
        },
        error: (error) => {
          this.toastService.close("0");
          this.toastService.error(
            this.translateService.instant(error.error, {
              elem: this.translateService.instant("currency"),
            })
          );
        },
      });
    }
        
  })

})
   
  }

  onClickAdd() {
    this.formModal.show({
      title: "menu.add-currency",
      confirm: () => this.onSave(null),
      cancel: () => this.onCancel(),
    });


  }

  onClickEdit(id: string) {
    this.findById(id);
    this.formModal.show({
      title: "menu.edit-currency",
      confirm: () => this.onSave(id),
      cancel: () => this.onCancel(),
    });
  }

 
  onClickArchive(id: string) {
    this.archiveModal.show(() => {
      this.currencyService.archive(id).subscribe({
        next: () => {
             this.findPage();
        this.findArchivedPage();

          this.archiveModal.hide();
            this.toastService.close("0");
            this.toastService.success(
              this.translateService.instant("success.deleted", {
                elem: this.translateService.instant("currency"),
              })
            );
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
      this.currencys.sort((a, b) => a.code.localeCompare(b.code));
      this.sortByCodeValid = false
    } else {
      this.currencys.sort((a, b) => b.code.localeCompare(a.code));
      this.sortByCodeValid = true
    }
  }

  sortBydigitalValid: boolean = true;
  sortBydigital() {
    if (this.sortBydigitalValid) {
      this.currencys.sort((a, b) => a.digitalcode.localeCompare(b.digitalcode));
      this.sortBydigitalValid = false
    } else {
      this.currencys.sort((a, b) => b.digitalcode.localeCompare(a.digitalcode));
      this.sortBydigitalValid = true
    }
  }
  sortBycountryValid: boolean = true;
  sortBycountry() {
    if (this.sortBycountryValid) {
      this.currencys.sort((a, b) => a.countryname.localeCompare(b.countryname));
      this.sortBycountryValid = false
    } else {
      this.currencys.sort((a, b) => b.countryname.localeCompare(a.countryname));
      this.sortBycountryValid = true
    }
  }


  sortByNameValid: boolean = true;
  sortByName() {
    if (this.sortByNameValid) {
      this.currencys.sort((a, b) => a.name.localeCompare(b.name));
      this.sortByNameValid = false
    } else {
      this.currencys.sort((a, b) => b.name.localeCompare(a.name));
      this.sortByNameValid = true
    }
  }


  findArchivedPage() {
    this.loading = true;
    this.currencyService
      .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
      .subscribe({
        next: (result) => {
          this.currencyss = result.content;
          this.currencyPages = result;
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
        },
        complete: () => (this.loading = false),
      });
  }



  onClickdisArchive(id: string) {
    this.currencyService.disArchive(id).subscribe({
      next: () => {
        this.findPage();
        this.findArchivedPage();

        this.toastService.success(
          this.translateService.instant("success.restore", {
            elem: this.translateService.instant("currency"),
          })
        );
        console.log(id);
      },
    });
  }



  onClickDelete(id: string) {
    this.currencyService.delete(id).subscribe({
      next: () => {
        this.findArchivedPage();
        console.log("Success");
        this.toastService.success(
          this.translateService.instant("success.deleted", {
            elem: this.translateService.instant("currency"),
          })
        );
      },
    });
  }



}
