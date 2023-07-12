import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashwilComponent } from './trashwil.component';

describe('TrashwilComponent', () => {
  let component: TrashwilComponent;
  let fixture: ComponentFixture<TrashwilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashwilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashwilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
