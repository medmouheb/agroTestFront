import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmethodsFormGeneralComponent } from './shipmethods-form-general.component';

describe('ShipmethodsFormGeneralComponent', () => {
  let component: ShipmethodsFormGeneralComponent;
  let fixture: ComponentFixture<ShipmethodsFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmethodsFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipmethodsFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
