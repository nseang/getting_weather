import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface WeatherDisplay {
  tempHigh: number,
  tempLow: number,
  weather: string
}


@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  localWeather: WeatherDisplay = {
    tempHigh: 0,
    tempLow: 0,
    weather: " "
  }

  searchedWeather: WeatherDisplay = {
    tempHigh: 0,
    tempLow: 0,
    weather: " "
  }

  constructor(private http: HttpClient) { }

  getWeatherByLatLon(lat: string, lon: string) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York`
    return this.http.get<any>(url);
  }

  getWeatherByCity() {

  }

  getLatLonFromCity(city: string) {
    // let url = 'https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters'

    
  }

  getLocation() {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  setLocalWeather(high: number, low: number, localWeather: string) {
    this.localWeather.tempHigh = high;
    this.localWeather.tempLow = low;
    this.localWeather.weather = localWeather;
    console.log(this.localWeather)
  }

  getLocalWeather() {
    return this.localWeather
  }


  setSearchedWeather(high: number, low: number, searchedWeather: string) {
    this.searchedWeather.tempHigh = high;
    this.searchedWeather.tempLow = low;
    this.searchedWeather.weather = searchedWeather;
    console.log(this.searchedWeather)
  }

  getSearchedWeather() {
    return this.searchedWeather;
  }
}
