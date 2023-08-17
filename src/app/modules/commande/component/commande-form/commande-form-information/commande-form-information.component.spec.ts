import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFormInformationComponent } from './commande-form-information.component';

describe('CommandeFormInformationComponent', () => {
  let component: CommandeFormInformationComponent;
  let fixture: ComponentFixture<CommandeFormInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeFormInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandeFormInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
