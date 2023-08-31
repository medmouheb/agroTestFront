import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementdesStocksListComponent } from './rapprochementdes-stocks-list.component';

describe('RapprochementdesStocksListComponent', () => {
  let component: RapprochementdesStocksListComponent;
  let fixture: ComponentFixture<RapprochementdesStocksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapprochementdesStocksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapprochementdesStocksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
