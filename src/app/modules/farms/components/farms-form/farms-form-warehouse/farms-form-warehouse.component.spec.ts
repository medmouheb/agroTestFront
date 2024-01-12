import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormWarehouseComponent } from './farms-form-warehouse.component';

describe('FarmsFormWarehouseComponent', () => {
  let component: FarmsFormWarehouseComponent;
  let fixture: ComponentFixture<FarmsFormWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormWarehouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
