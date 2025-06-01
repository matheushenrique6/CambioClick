import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelecionarMoedaPageRoutingModule } from './selecionar-moeda-routing.module';

import { SelecionarMoedaPage } from './selecionar-moeda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelecionarMoedaPageRoutingModule
  ],
  declarations: [SelecionarMoedaPage]
})
export class SelecionarMoedaPageModule {}
