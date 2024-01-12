import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaportListComponent } from './seaport-list.component';

describe('SeaportListComponent', () => {
  let component: SeaportListComponent;
  let fixture: ComponentFixture<SeaportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
