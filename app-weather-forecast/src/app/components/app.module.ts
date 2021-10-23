import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';


@NgModule({
  declarations: [
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [WeatherForecastComponent]
})
export class AppModule { }
