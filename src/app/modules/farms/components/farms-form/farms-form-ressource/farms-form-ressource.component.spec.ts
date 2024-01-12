import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormRessourceComponent } from './farms-form-ressource.component';

describe('FarmsFormRessourceComponent', () => {
  let component: FarmsFormRessourceComponent;
  let fixture: ComponentFixture<FarmsFormRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormRessourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
