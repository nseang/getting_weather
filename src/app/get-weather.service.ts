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
    // Had initally planed to use a free weather API that could take in city names
    // Most Free APIs were too limited to how many calls could be used per day

  }

  getLatLonFromCity(city: string) {
    // Wanted to use the google API to get Lat Lon from city names, but was unable to obtain an API key
    // let url = 'https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters'

    
  }

  getLocation() {
    // initially had the geolocation use a arrow function, but it had caused some issues with timing
    // and would always be late with returning the coordinates.
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
