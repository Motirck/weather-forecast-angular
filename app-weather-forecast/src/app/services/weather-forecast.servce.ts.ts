import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  private _baseUrl = `https://localhost:3000/`;

  constructor(private _http: HttpClient) { }

  public BuscarEventosSala(id: any): Observable<any> {
    const apiurl = `${this._baseUrl}/${id}/Eventos`;
    return this._http.get<any>(apiurl);
  }
}
