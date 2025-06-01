import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private API_KEY = '2bd282039674cb8ecee71a7d';
  private BASE_URL = `https://v6.exchangerate-api.com/v6/${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  getRates(base: string = 'USD') {
    return this.http.get(`${this.BASE_URL}/latest/${base}`);
  }
}
