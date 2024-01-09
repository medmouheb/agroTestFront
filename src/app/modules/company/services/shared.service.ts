import { Injectable } from "@angular/core";
import { StepperComponent } from "app/shared/components/stepper/stepper.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {

  private isActive = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActive.asObservable();




  public setIsActive(value: boolean) {
    localStorage.setItem("st",   value ? "true": "false")
    
    
    
    return this.isActive.next(value);
  }







}
