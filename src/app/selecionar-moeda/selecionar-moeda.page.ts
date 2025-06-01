import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-selecionar-moeda',
  templateUrl: './selecionar-moeda.page.html',
  styleUrls: ['./selecionar-moeda.page.scss'],
})
export class SelecionarMoedaPage implements OnInit {
  moedas: any[] = [];
  moedasFiltradas: any[] = [];
  termoBusca: string = '';

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {}

  ngOnInit() {
    this.moedas = this.navParams.get('moedas');
    this.moedasFiltradas = [...this.moedas];
  }

  filtrarMoedas() {
    const termo = this.termoBusca.toLowerCase();
    this.moedasFiltradas = this.moedas.filter(moeda =>
      moeda.code.toLowerCase().includes(termo) ||
      moeda.name.toLowerCase().includes(termo)
    );
  }

  selecionar(moeda: any) {
    this.modalCtrl.dismiss(moeda);
  }

  fechar() {
    this.modalCtrl.dismiss();
  }
}
