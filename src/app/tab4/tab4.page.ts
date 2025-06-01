import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { SelecionarMoedaPage } from '../selecionar-moeda/selecionar-moeda.page';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
})
export class Tab4Page implements OnInit {

  selectedCurrency = 'USD';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
        borderColor: 'blue',
        backgroundColor: 'lightblue',
        fill: true,
        tension: 0.5
      }
    ]
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(
    private exchangeService: ExchangeRateService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadChart(this.selectedCurrency);
  }

  async abrirModalMoeda() {
    const modal = await this.modalCtrl.create({
      component: SelecionarMoedaPage
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.selectedCurrency = data.code;
      this.loadChart(this.selectedCurrency);
    }
  }

  loadChart(baseCurrency: string) {
    this.exchangeService.getRates(baseCurrency).subscribe({
      next: (res: any) => {
        const brlRate = res.conversion_rates['BRL'];

        const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Hoje'];
        const values = Array(6).fill(0).map(() =>
          +(brlRate + (Math.random() - 0.5) * 0.1).toFixed(2)
        );
        values.push(brlRate);

        this.lineChartData = {
          labels: labels,
          datasets: [
            {
              data: values,
              label: `${baseCurrency} → BRL`,
              borderColor: 'blue',
              backgroundColor: 'lightblue',
              fill: true,
              tension: 0.5
            }
          ]
        };

        this.chart?.update();
      },
      error: (err) => {
        console.error('Erro ao buscar taxas:', err);
      }
    });
  }
}
