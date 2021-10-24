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
  public space: string = '';
  public comma: string = '';
  public showSpinner: boolean = false;

  constructor(
    private _service: WeatherForecastService) {
  }
  ngOnInit(): void {
    this.FillStates();
    this.FillCountries();
    // this.dataWeather = { "lat": 2.8208, "lon": -60.672, "timezone": "America/Boa_Vista", "timezone_offset": -14400, "current": { "dt": 1635080570, "sunrise": 1635068741, "sunset": 1635112064, "temp": 28.99, "feels_like": 32.71, "pressure": 1012, "humidity": 70, "dew_point": 22.96, "uvi": 4.99, "clouds": 40, "visibility": 10000, "wind_speed": 3.6, "wind_deg": 70, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }] }, "daily": [{ "dt": 1635087600, "sunrise": 1635068741, "sunset": 1635112064, "moonrise": 1635123600, "moonset": 1635079500, "moon_phase": 0.62, "temp": { "day": 30.67, "min": 24.28, "max": 33.43, "night": 24.28, "eve": 30.93, "morn": 25.53 }, "feels_like": { "day": 34.16, "night": 25.04, "eve": 34.45, "morn": 26.18 }, "pressure": 1012, "humidity": 60, "dew_point": 22.02, "wind_speed": 4.51, "wind_deg": 49, "wind_gust": 6.25, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 29, "pop": 0.86, "rain": 3.84, "uvi": 11.47 }, { "dt": 1635174000, "sunrise": 1635155139, "sunset": 1635198453, "moonrise": 1635213000, "moonset": 1635168900, "moon_phase": 0.65, "temp": { "day": 29.31, "min": 23.22, "max": 30.26, "night": 25.51, "eve": 29.46, "morn": 23.23 }, "feels_like": { "day": 32.64, "night": 26.28, "eve": 33.14, "morn": 24.06 }, "pressure": 1014, "humidity": 66, "dew_point": 22.35, "wind_speed": 3.9, "wind_deg": 74, "wind_gust": 7.92, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 100, "pop": 0.97, "rain": 5.51, "uvi": 11.18 }, { "dt": 1635260400, "sunrise": 1635241537, "sunset": 1635284844, "moonrise": 1635302400, "moonset": 1635258300, "moon_phase": 0.68, "temp": { "day": 30.56, "min": 23.05, "max": 32.79, "night": 23.93, "eve": 30.45, "morn": 23.27 }, "feels_like": { "day": 34.88, "night": 24.75, "eve": 34.16, "morn": 24.08 }, "pressure": 1012, "humidity": 64, "dew_point": 22.88, "wind_speed": 4.49, "wind_deg": 69, "wind_gust": 9.42, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 70, "pop": 0.97, "rain": 6.78, "uvi": 9.68 }, { "dt": 1635346800, "sunrise": 1635327936, "sunset": 1635371235, "moonrise": 1635391920, "moonset": 1635347760, "moon_phase": 0.71, "temp": { "day": 28.82, "min": 23.2, "max": 31.49, "night": 24.22, "eve": 30.22, "morn": 23.2 }, "feels_like": { "day": 32.16, "night": 25.05, "eve": 33.91, "morn": 24.03 }, "pressure": 1012, "humidity": 69, "dew_point": 22.52, "wind_speed": 2.31, "wind_deg": 152, "wind_gust": 2.92, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 99, "pop": 1, "rain": 9.37, "uvi": 11.53 }, { "dt": 1635433200, "sunrise": 1635414335, "sunset": 1635457626, "moonrise": 0, "moonset": 1635437160, "moon_phase": 0.75, "temp": { "day": 30.17, "min": 22.77, "max": 31.36, "night": 25.79, "eve": 29.39, "morn": 22.77 }, "feels_like": { "day": 33.37, "night": 26.49, "eve": 32.61, "morn": 23.56 }, "pressure": 1013, "humidity": 61, "dew_point": 21.91, "wind_speed": 4.28, "wind_deg": 55, "wind_gust": 5.92, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 93, "pop": 0.93, "rain": 5.73, "uvi": 1.97 }, { "dt": 1635519600, "sunrise": 1635500736, "sunset": 1635544019, "moonrise": 1635481320, "moonset": 1635526560, "moon_phase": 0.78, "temp": { "day": 32.23, "min": 24.08, "max": 34.07, "night": 27.07, "eve": 30.19, "morn": 24.08 }, "feels_like": { "day": 35.04, "night": 28.97, "eve": 33.62, "morn": 24.74 }, "pressure": 1012, "humidity": 51, "dew_point": 20.77, "wind_speed": 3.72, "wind_deg": 54, "wind_gust": 5.5, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" }], "clouds": 2, "pop": 0.07, "uvi": 2 }, { "dt": 1635606000, "sunrise": 1635587137, "sunset": 1635630413, "moonrise": 1635570780, "moonset": 1635615840, "moon_phase": 0.81, "temp": { "day": 32.65, "min": 24.22, "max": 33.99, "night": 26.37, "eve": 29.94, "morn": 24.22 }, "feels_like": { "day": 35.33, "night": 26.37, "eve": 32.92, "morn": 24.84 }, "pressure": 1010, "humidity": 49, "dew_point": 20.57, "wind_speed": 3.8, "wind_deg": 64, "wind_gust": 6.71, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "clouds": 58, "pop": 0.39, "rain": 0.54, "uvi": 2 }, { "dt": 1635692400, "sunrise": 1635673539, "sunset": 1635716807, "moonrise": 1635660120, "moonset": 1635705000, "moon_phase": 0.84, "temp": { "day": 32.18, "min": 23.72, "max": 33.42, "night": 24.31, "eve": 30.66, "morn": 23.72 }, "feels_like": { "day": 35.21, "night": 25.12, "eve": 34.14, "morn": 24.42 }, "pressure": 1012, "humidity": 52, "dew_point": 21.06, "wind_speed": 2.78, "wind_deg": 65, "wind_gust": 4.3, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "clouds": 82, "pop": 0.89, "rain": 8.48, "uvi": 2 }] }
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

  StateSelected() {
    this.selectedCity = '';
    this.dataWeather = { daily: [] };
    STATE_CITIES.forEach(item => {
      if (item.initials === this.selectedState) {
        this.citiesList = item.cities
      }
    });
  }

  CountrySelectec() {
    this.selectedCity = '';
    this.selectedState = '';
    this.dataWeather = { daily: [] };
  }

  GetWeatherForecast() {
    this.showSpinner = true;
    this.selectedCity = this.selectedCity.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // removing accents
    this._service.GetWeatherForecast({ city: this.selectedCity, state: this.selectedState, country: this.selectedCountry }).subscribe(result => {
      if (result) {
        this.dataWeather = result
        this.showSpinner = false;
      } else {
        console.error('Something went wrong')
        this.dataWeather = { daily: [] };
        this.showSpinner = false;
      }
    });
  }

}
