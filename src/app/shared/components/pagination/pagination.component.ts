import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Page } from "../../models";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {
  @Input()
  pageNumber!: number;

  @Input()
  pageSize!: number;

  @Input()
  page!: Page<any>;

  @Output()
  onPageNumberChange = new EventEmitter<number>();

  @Output()
  onPageSizeChange = new EventEmitter<number>();

  constructor() {}

  onClickNext() {
    if (this.page.last) {
      return;
    }
    this.onPageNumberChange.emit(++this.pageNumber);
  }

  onClickPrev() {
    if (this.pageNumber === 0) {
      return;
    }
    this.onPageNumberChange.emit(--this.pageNumber);
  }
}
