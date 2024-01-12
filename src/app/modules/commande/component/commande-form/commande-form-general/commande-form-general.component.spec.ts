import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFormGeneralComponent } from './commande-form-general.component';

describe('CommandeFormGeneralComponent', () => {
  let component: CommandeFormGeneralComponent;
  let fixture: ComponentFixture<CommandeFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
