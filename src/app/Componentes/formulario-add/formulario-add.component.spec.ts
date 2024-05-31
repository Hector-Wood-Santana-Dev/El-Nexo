import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAddComponent } from './formulario-add.component';

describe('FormularioAddComponent', () => {
  let component: FormularioAddComponent;
  let fixture: ComponentFixture<FormularioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
