import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightermsListComponent } from './freighterms-list.component';

describe('FreightermsListComponent', () => {
  let component: FreightermsListComponent;
  let fixture: ComponentFixture<FreightermsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreightermsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightermsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
