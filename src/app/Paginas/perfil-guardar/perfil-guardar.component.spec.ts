import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGuardarComponent } from './perfil-guardar.component';

describe('PerfilGuardarComponent', () => {
  let component: PerfilGuardarComponent;
  let fixture: ComponentFixture<PerfilGuardarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilGuardarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerfilGuardarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
