import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/modules/company/services/shared.service';
import { productCategory } from 'app/modules/product-category/Models/productCategory.model';

@Component({
  selector: 'app-product-category-notes',
  templateUrl: './product-category-notes.component.html',
  styleUrls: ['./product-category-notes.component.scss']
})
export class ProductCategoryNotesComponent implements OnInit {


  @Input() productCategory!: productCategory
  addform: FormGroup;

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    this.addform = new FormGroup({
      notes: new FormControl("", [
        Validators.maxLength(200),
      ]),
    });
  }
  get notes() { return this.addform.get('notes') }


  geValues(event) {
    this.sharedService.setIsActive(false);
    if (this.addform.valid) {
      this.sharedService.setIsActive(true);
    }

  }


}
