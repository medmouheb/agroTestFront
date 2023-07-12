import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFormLocalComponent } from './sales-form-local.component';

describe('SalesFormLocalComponent', () => {
  let component: SalesFormLocalComponent;
  let fixture: ComponentFixture<SalesFormLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFormLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesFormLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
