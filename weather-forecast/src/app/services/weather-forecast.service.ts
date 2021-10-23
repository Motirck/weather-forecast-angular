import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressForecast } from '../models/AddressForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private _baseUrl = `http://localhost:3000/v1/forecast`;

  constructor(private _http: HttpClient) { }

  public GetWeatherForecast({ city, state, country }: AddressForecast): Observable<any> {
    const apiurl = `${this._baseUrl}/${city}/${state}/${country}`;
    return this._http.get<any>(apiurl);
  }
}
