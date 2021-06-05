import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorResultadosComponent } from './contador-resultados.component';

describe('ContadorResultadosComponent', () => {
  let component: ContadorResultadosComponent;
  let fixture: ComponentFixture<ContadorResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContadorResultadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
