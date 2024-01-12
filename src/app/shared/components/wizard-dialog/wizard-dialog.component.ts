import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnChanges,
  ChangeDetectorRef,
  AfterViewChecked,
} from "@angular/core";
import { SharedService } from "app/modules/company/services/shared.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wizard-dialog",
  templateUrl: "./wizard-dialog.component.html",
  styleUrls: ["./wizard-dialog.component.scss"],
})
export class WizardDialogComponent
  implements OnInit, OnChanges, AfterViewChecked
{
  @Input()
  type: string = null;
  @Input()
  field: [] = null;
  content: any;
  @Input()
  currentStep!: number;
  @Input()
  entity: any = null;
  wizard: any;
  wizardStep: any;

  isNext: boolean;
  isSave: boolean;
  subscription: Subscription;

  constructor(
    private sharedServ: SharedService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): any {
    this.wizardStep = 1;
    this.sharedServ.setIsActive(true);
    this.sharedServ.isActive$.subscribe((data) => {});
    this.subscription = this.sharedServ.isActive$.subscribe((response) => {
      this.isNext = response;
    });
  }

  show({ title, confirm, cancel, prev, stepsCount }: any) {
    this.content = {
      title,
      confirm,
      cancel: () => {
        this.content = null;
        if (cancel) {
          cancel();
        }
      },
      prev,
      stepsCount,
    };
  }

  actionBtnLabel() {
    return this.content && this.content.stepsCount === this.currentStep;
  }
  isfirstStep() {
    return this.content && this.currentStep === 0;
  }

  hide() {
    if (this.content.cancel) {
      this.content.cancel();
    }
    this.content = null;
  }

  protected onClickOutside(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.hide();
  }

  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
    evt: KeyboardEvent,
  ) {
    this.hide();
  }

  goTo(step: number) {
    this.wizardStep = step;
  }

  ngOnChanges() {
    this.subscription = this.sharedServ.isActive$.subscribe((response) => {});
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
}
