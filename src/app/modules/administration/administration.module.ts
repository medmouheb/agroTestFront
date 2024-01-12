import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdministrationRoutingModule } from "./administration-routing.module";
import { SharedModule } from "app/shared/shared.module";

import { UsersListComponent } from "./users-list/users-list.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";

@NgModule({
  declarations: [UsersListComponent, VerifyEmailComponent],
  imports: [CommonModule, AdministrationRoutingModule, SharedModule],
  providers: [],
})
export class AdministrationModule {}
