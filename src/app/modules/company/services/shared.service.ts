import { Injectable } from "@angular/core";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {

  private isActive = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActive.asObservable();

  // private isTrue = new BehaviorSubject<boolean>(false);
  // isTrue$ = this.isTrue.asObservable();

  public setIsActive(value: boolean) {
    localStorage.setItem("st",   value ? "true": "false")
    console.log("====================================");
    console.log("set true ", value);
    console.log("====================================");
    return this.isActive.next(value);
  }

  // public setIsTrue(vale: boolean) {
  //   console.log("====================================");
  //   console.log("set is true ", vale);
  //   console.log("====================================");
  //   return this.isTrue.next(vale);
  // }
}
