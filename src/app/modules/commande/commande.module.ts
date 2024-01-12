import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeRoutingModule } from './commande-routing.module';
import { CommandeFormComponent } from './component/commande-form/commande-form.component';
import { CommandeListComponent } from './component/commande-list/commande-list.component';
import { CommandeFormGeneralComponent } from './component/commande-form/commande-form-general/commande-form-general.component';
import { CommandeFormInformationComponent } from './component/commande-form/commande-form-information/commande-form-information.component';
import { SharedModule } from "../../shared/shared.module";
import { CommandeFormScheduleComponent } from './component/commande-form/commande-form-schedule/commande-form-schedule.component';

@NgModule({
    declarations: [
        CommandeFormComponent,
        CommandeListComponent,
        CommandeFormGeneralComponent,
        CommandeFormInformationComponent,
        CommandeFormScheduleComponent,
    ],
    imports: [
        CommonModule,
        CommandeRoutingModule,
        SharedModule
    ]
})
export class CommandeModule { }
