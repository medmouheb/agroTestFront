import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from 'app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from 'app/shared/components/dialog/dialog.component';
import { StepperComponent } from 'app/shared/components/stepper/stepper.component';
import { FreightTerms } from '../../models/freightterms';
import { Page, initPage } from 'app/shared/models';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { FreightTermsService } from '../../Service/freight-terms.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-freighterms-list',
  templateUrl: './freighterms-list.component.html',
  styleUrls: ['./freighterms-list.component.scss']
})
export class FreightermsListComponent implements OnInit {
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
  freightterm:FreightTerms={}

 freightterms: Array<FreightTerms> = [];
  freighttermss: Array<FreightTerms> = [];
  loading = false;
  freighttermPage: Page<FreightTerms> = initPage;
  freighttermPages: Page<FreightTerms> = initPage;
  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  currentStep = 0;
  steps: any = ["steps.general"];

  isChecked: boolean = false;
  affiche:boolean = false;
  constructor(
    private freighttermsservice:FreightTermsService,
    private translateService: TranslateService,

    private toastService: HotToastService,
    private http: HttpClient

  ) { }

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
   this.findArchivedPage();
   this.findPage();
   this.onPaginationChange.subscribe(() => this.findPage());
 }
 findPage() {
   this.loading = true;
   this.freighttermsservice
     .findPage(this.pageNumber, this.pageSize, this.filter)
     .subscribe({
       next: (result) => {
         console.log(result.content)
         this.freightterms = result.content;
         this.freighttermPage = result;
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
  this.freighttermsservice
    .findArchivedPage(this.pageNumber, this.pageSize, this.filter)
    .subscribe({
      next: (result) => {
        this.freighttermss = result.content;
        this.freighttermPages = result;
      
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
      },
      complete: () => (this.loading = false),
    });
}

 findById(id: string) {
   this.freighttermsservice.findById(id).subscribe({
     next: (result) => (this.freightterm = result),
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
   this.freightterm = {};
   this.currentStep = 0;
 }

 onSave(id: string | null) {
   this.toastService.loading(
     this.translateService.instant("message.loading..."),
     {
       id: "0",
     }
   );
   console.log(this.freightterm)
   if((this.freightterm.freighttermcode==undefined) ||(this.freightterm.freighttermcode=='')  ){
     this.toastService.close("0");
     let lg=localStorage.getItem("locale")
     this.http.get(  "../../../../../assets/i18n/" + lg + ".json").subscribe((data:any) => {
      this.toastService.warning(data.verifCodeName)

    });
    //  this.toastService.warning("Verify your freightterm code"
      
    //  );
     return;
   }else  if((this.freightterm.freighttermname ==undefined) ||(this.freightterm.freighttermname =='')  ){
     this.toastService.close("0");
     this.toastService.warning("Verify your freightterm name"
      
     );
     return;
   }
   this.freighttermsservice.findbycode(this.freightterm.freighttermcode).subscribe(data => {
     console.log(data)
     if (data != null) {
       this.toastService.warning("Ship methode code must be unique");
       this.toastService.close("0"); 
       this.toastService.error(
         this.translateService.instant("freightterm"),
     
       )
       return;
   }
   
   return[];
   
   })

   this.freighttermsservice.save(id, this.freightterm!).subscribe({
     next: () => {
       this.findPage();
       this.formModal.hide();-
       this.onCancel();
       this.toastService.close("0");
       this.toastService.success(
         this.translateService.instant("success.saved", {
           elem: this.translateService.instant("freightterm"),
         })
       );
     },
     error: (error) => {
       this.toastService.close("0"); 
       this.toastService.error(
         this.translateService.instant(error.error, {
           elem: this.translateService.instant("freightterm"),
         })
       );
     },
   });
 }

 onClickAdd() {
   this.formModal.show({
     title: "menu.add-freightterm",
     confirm: () => this.onSave(null),
     cancel: () => this.onCancel(),
   });
   this.formModal.setsubmitstatus(false)
 }

 onClickEdit(id: string) {
   this.findById(id);
   this.formModal.show({
     title: "menu.edit-freightterm",
     confirm: () => this.onSave(id),
     cancel: () => this.onCancel(),
   });
   this.formModal.setsubmitstatus(true)

 }

 
 onClickArchive(id: string) {
   this.archiveModal.show(() => {
     this.freighttermsservice.archive(id).subscribe({
       next: () => {
            this.findPage();
            this.findArchivedPage();
         this.archiveModal.hide();
           this.toastService.close("0");
           this.toastService.success(
             this.translateService.instant("success.deleted", {
               elem: this.translateService.instant("freightterm"),
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
  if(this.affiche){
    if (this.sortByCodeValid) {
      this.freighttermss.sort((a, b) => a.freighttermcode.localeCompare(b.freighttermcode));
      this.sortByCodeValid = false
    } else {
      this.freighttermss.sort((a, b) => b.freighttermcode.localeCompare(a.freighttermcode));
      this.sortByCodeValid = true
    }
  }else{
    if (this.sortByCodeValid) {
      this.freightterms.sort((a, b) => a.freighttermcode.localeCompare(b.freighttermcode));
      this.sortByCodeValid = false
    } else {
      this.freightterms.sort((a, b) => b.freighttermcode.localeCompare(a.freighttermcode));
      this.sortByCodeValid = true
    }
  }

 }



 sortByNameValid: boolean = true;
 sortByName() {
  if(this.affiche){
    if (this.sortByNameValid) {
      this.freighttermss.sort((a, b) => a.freighttermname .localeCompare(b.freighttermname ));
      this.sortByNameValid = false
    } else {
      this.freighttermss.sort((a, b) => b.freighttermname .localeCompare(a.freighttermname ));
      this.sortByNameValid = true
    }
  }else{
    if (this.sortByNameValid) {
      this.freightterms.sort((a, b) => a.freighttermname .localeCompare(b.freighttermname ));
      this.sortByNameValid = false
    } else {
      this.freightterms.sort((a, b) => b.freighttermname .localeCompare(a.freighttermname ));
      this.sortByNameValid = true
    }
  }

 }








 
 onClickdisArchive(id: string) {
   this.freighttermsservice.disArchive(id).subscribe({
     next: () => {
       this.findArchivedPage();
       this.findPage()
       this.toastService.success(
         this.translateService.instant("success.restore", {
           elem: this.translateService.instant("freightterm"),
         })
       );
       console.log(id);
     },
   });
 }

 
 onClickDelete(id: string) {
   console.log(id)
   this.freighttermsservice.delete(id).subscribe({
     next: () => {
       this.findArchivedPage();
       this.findPage();

       console.log("Success");
       this.toastService.success(
         this.translateService.instant("success.deleted", {
           elem: this.translateService.instant("freightterm"),
         })
       );
     },
   });
 }

}
