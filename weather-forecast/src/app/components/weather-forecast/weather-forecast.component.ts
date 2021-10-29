import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import { STATE_CITIES } from 'src/app/utils/state-cities-br';
import { STATES } from 'src/app/utils/states-br';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

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
    private _service: WeatherForecastService,
    private toastr: ToastrService) {
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
    const selectedCity = this.selectedCity?.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // removing accents
    this._service.GetWeatherForecast({ city: selectedCity, state: this.selectedState, country: this.selectedCountry }).subscribe(result => {
      if (result) {
        this.dataWeather = result
        this.showSpinner = false;
        this.toastr.success('Previsão do tempo para a localidade informada encontrada com sucesso!', 'Sucesso')
      } else {
        console.error('Something went wrong')
        this.dataWeather = { daily: [] };
        this.showSpinner = false;
      }
    }, (err) => {
      this.showSpinner = false;
      this.toastr.warning('Não foram encontradas informações de tempo para a localidade informada.', `Atenção - Erro: ${err.status}`)
    })
  }

}
