import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelecionarMoedaPage } from './selecionar-moeda.page';

describe('SelecionarMoedaPage', () => {
  let component: SelecionarMoedaPage;
  let fixture: ComponentFixture<SelecionarMoedaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecionarMoedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
