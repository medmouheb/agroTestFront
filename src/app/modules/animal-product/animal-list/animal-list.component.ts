import { Component, EventEmitter, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ConfirmDialogComponent } from "app/shared/components/confirm-dialog/confirm-dialog.component";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { WizardDialogComponent } from "app/shared/components/wizard-dialog/wizard-dialog.component";

@Component({
  selector: "app-animal-list",
  templateUrl: "./animal-list.component.html",
  styleUrls: ["./animal-list.component.scss"],
})
export class AnimalListComponent {
  @ViewChild("deleteModal")
  deleteModal!: ConfirmDialogComponent;
  @ViewChild("archiveModal")
  archiveModal!: ConfirmDialogComponent;
  @ViewChild("formModal")
  formModal!: WizardDialogComponent;
  @ViewChild("stepper")
  stepper!: StepperComponent;

  loading = false;
  filter = "";
  pageNumber = 0;
  pageSize = 10;

  onPaginationChange: EventEmitter<string> = new EventEmitter<string>();
  form: FormGroup;

  currentStep = 0;
  steps: any = ["steps.general", "steps.localisation"];

  constructor() {}

  onClickAdd() {
    this.formModal.show({
      title: "menu.add",
      stepsCount: this.steps.length - 1,
    });
  }

  onFilterChange(filter: string) {
    this.filter = filter;
    this.pageNumber = 0;
    this.onPaginationChange.emit("");
  }

  findPage() {
    this.loading = true;
  }
}
