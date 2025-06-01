import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecionarMoedaPage } from './selecionar-moeda.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionarMoedaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecionarMoedaPageRoutingModule {}
