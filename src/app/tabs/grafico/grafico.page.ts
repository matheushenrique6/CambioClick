import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.page.html',
  styleUrls: ['./grafico.page.scss'],
})
export class GraficoPage implements OnInit, AfterViewInit {
  moedas: { sigla: string, nome: string }[] = [];
  moedasFiltradas: { sigla: string, nome: string }[] = [];
  filtro = '';
  moedaBase = '';
  moedaDestino = '';
  chart: any;

  carregando = false;
  mensagemErro = '';

  private readonly API_KEY = '2bd282039674cb8ecee71a7d';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarMoedas();
  }

  ngAfterViewInit() {
    // O gráfico será desenhado após carregar as moedas
  }

  carregarMoedas() {
    this.http.get<any>(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/codes`)
      .subscribe(res => {
        if (res && res.result === 'success') {
          this.moedas = res.supported_codes.map(([sigla, nome]: [string, string]) => ({
            sigla,
            nome
          }));
          this.moedasFiltradas = [...this.moedas];
          this.moedaBase = this.moedas.find(m => m.sigla === 'USD')?.sigla || this.moedas[0].sigla;
          this.moedaDestino = this.moedas.find(m => m.sigla === 'BRL')?.sigla || this.moedas[1].sigla;
          setTimeout(() => this.atualizarGrafico(), 300); // Garante que o canvas já existe
        }
      });
  }

  filtrarMoedas() {
    const termo = this.filtro.toLowerCase();
    this.moedasFiltradas = this.moedas.filter(m =>
      m.sigla.toLowerCase().includes(termo) ||
      m.nome.toLowerCase().includes(termo)
    );
  }

  atualizarGrafico() {
    if (!this.moedaBase || !this.moedaDestino) return;

    this.mensagemErro = '';
    this.carregando = true;

    this.http.get<any>(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/${this.moedaBase}`)
      .subscribe(res => {
        this.carregando = false;

        if (res && res.result === 'success') {
          const rate = res.conversion_rates[this.moedaDestino];

          // Simula 7 dias de histórico
          const labels: string[] = [];
          const data: number[] = [];

          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString());

            const simulatedRate = (rate * (1 + (Math.random() - 0.5) * 0.04)).toFixed(4);
            data.push(+simulatedRate);
          }

          const canvas: any = document.getElementById('graficoCotacao');
          if (!canvas) {
            console.error('Canvas não encontrado!');
            return;
          }

          if (this.chart) this.chart.destroy();

          this.chart = new Chart(canvas, {
            type: 'line',
            data: {
              labels,
              datasets: [{
                label: `${this.moedaBase}/${this.moedaDestino}`,
                data,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: true }
              },
              scales: {
                y: {
                  beginAtZero: false
                }
              }
            }
          });
        } else {
          this.mensagemErro = 'Erro ao obter dados da cotação.';
          console.error('Resposta da API inválida', res);
        }
      }, error => {
        this.carregando = false;
        this.mensagemErro = 'Erro ao buscar dados da cotação. Verifique sua conexão ou tente novamente.';
        console.error('Erro ao buscar cotação:', error);
      });
  }
}
