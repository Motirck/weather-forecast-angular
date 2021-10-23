import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { STATE_CITIES } from 'src/app/utils/state-cities-br';
import { STATES } from 'src/app/utils/states-br';
import * as moment from 'moment'

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  public moment = moment
  public selectedCity: string = '';
  public citiesList: Array<string> = [];
  public selectedState: string = '';
  public statesList: Array<any> = [];
  public selectedCountry: string = '';
  public countryList: Array<any> = [];
  public dataWeather: any = { daily: [] };

  constructor(
    private _service: WeatherForecastService) {
      this.selectedState = 'MG'
      this.selectedCity = 'Timóteo'
      this.selectedCountry = 'BR'
  }
  ngOnInit(): void {
    this.FillStates();
    this.FillCountries();
  }

  FillStates() {
    this.statesList = STATES;
  }

  FillCountries() {
    this.countryList = [
      { id: 1, name: "BR" },
      // { id: 2, name: "US" },
    ];
  }

  StateSelectec() {
    this.selectedCity = '';
    this.selectedCountry = '';
    STATE_CITIES.forEach(item => {
      if (item.initials === this.selectedState) {
        this.citiesList = item.cities
      }
    });
  }

  getBackground(weather:any) {
    console.log(weather.id);
    if (weather.id >= 200 &&  weather.id < 300) return 'tempestade.png';
    if (weather.id < 400) return 'solcomchuva1.png';
    if (weather.id >= 500 && weather.id < 600) return 'chuvoso.png';
    if (weather.id < 700) return 'neve.jpeg';
    if (weather.id < 800) return 'tempestde.png';
    if (weather.id < 801) return 'ensolarado2.png';
    if (weather.id >= 801) return 'parcialmentenublado.png';

    return 'ensolarado2.png';
  }

  GetWeatherForecast() {
    this._service.GetWeatherForecast({ city: this.selectedCity, state: this.selectedState, country: this.selectedCountry }).subscribe(result => {
      if (result) {
        this.dataWeather = result
      } else {
        console.error('Something went wrong')
      }
    });
  }

}
