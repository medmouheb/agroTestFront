import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WillayaFormGeneralComponent } from './willaya-form-general.component';

describe('WillayaFormGeneralComponent', () => {
  let component: WillayaFormGeneralComponent;
  let fixture: ComponentFixture<WillayaFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WillayaFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WillayaFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
