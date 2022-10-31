import { Component, OnInit } from '@angular/core';
import { GetWeatherService, WeatherDisplay } from '../get-weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {
  localWeather!: WeatherDisplay;
  searchedWeather!: WeatherDisplay;
  error: boolean = false;

  constructor(private weatherService: GetWeatherService) { }

  ngOnInit(): void {
  }

  getLocalWeather() {
   this.localWeather = this.weatherService.getLocalWeather();
   console.log('local weather',this.localWeather)
  }

  getSearchedWeather() {
    this.searchedWeather = this.weatherService.getSearchedWeather();
    this.error = false;
  }

  displayError() {
    this.error = true;
  }

}
