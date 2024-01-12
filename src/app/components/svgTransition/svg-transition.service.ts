import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SvgTransitionService {
  private isTransitioned = false;

  toggleTransition() {
    if(!this.isTransitioned){
      let t = document.getElementById("sidebar") as HTMLElement
      t.style.width="37px"
      let t1 = document.getElementById("sideside") as HTMLElement
      t1.style.width="37px"

      let t2 = document.getElementById("main-panel") as HTMLElement
      t2.style.width="90%"
    }else{
      let t = document.getElementById("sidebar") as HTMLElement
      t.style.width="260px"
      let t1 = document.getElementById("sideside") as HTMLElement
      t1.style.width="260px"
      let t2 = document.getElementById("main-panel") as HTMLElement
      t2.style.width="calc(100% - 260px)"
    }
    this.isTransitioned = !this.isTransitioned;
    
  }

  getIsTransitioned() {
    return this.isTransitioned;
  }
}
