import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';
import { Country, State, City }  from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/dist/lib/state';
import _default from 'country-state-city/dist/lib/city';
@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {

  public moment = moment
  public selectedCity: string = '';
  public citiesList: Array<any> = [];
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
    this.FillCountries();
    this.selectedCity = 'Timoteo';
    this.selectedState = 'MG';
    this.selectedCountry = 'BR';
    this.GetWeatherForecast();
  }

  FillCountries() {
    this.countryList = Country.getAllCountries()
  }

  FillStates() {
    this.statesList = getStatesOfCountry(this.selectedCountry);
  }

  StateSelected() {
    this.selectedCity = '';
    this.dataWeather = { daily: [] };
    console.log(this.selectedCountry, this.selectedState)
    this.citiesList = _default.getCitiesOfState(this.selectedCountry, this.selectedState)
  }

  CountrySelectec() {
    this.selectedCity = '';
    this.selectedState = '';
    this.dataWeather = { daily: [] };
    this.FillStates()
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
      const status = err.status ? err.status : 500
      this.toastr.warning('Não foram encontradas informações de tempo para a localidade informada.', `Atenção - Erro: ${status}`)
    })
  }

}
