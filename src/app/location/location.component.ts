import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetWeatherService } from '../get-weather.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Output() gotLocalWeather = new EventEmitter();
  @Output() gotSearchedWeather = new EventEmitter();
  @Output() displayError = new EventEmitter();
  latitude!: string;
  longitude!: string;




  weatherCodes = [
    {id:0, value:"Clear Sky"},
    {id:1, value:"Mainly Clear"},
    {id:2, value:"Partly Cloudy"},
    {id:3, value:"Overcast"},
    {id:45, value:"Fog"},
    {id:48, value:"Depositing rime fog"},
    {id:51, value:"Light Drizzle"},
    {id:53, value:"Moderate Drizzle"},
    {id:55, value:"Dense Drizzle"},
    {id:56, value:"Freezing Light Drizzle"},
    {id:57, value:"Freezomg Dense Drizzle"},
    {id:61, value:"Light Rain"},
    {id:63, value:"Moderate Rain"},
    {id:65, value:"Heavy Rain"},
    {id:66, value:"Freezing Light Rain"},
    {id:67, value:"Freezing Heavy Rain"},
    {id:71, value:"Snow Fall: Light"},
    {id:73, value:"Snow Fall: Moderate"},
    {id:75, value:"Snow Fall: Heavy"},
    {id:77, value:"Snow Grains"},
    {id:80, value:"Rain Showers: Light"},
    {id:81, value:"Rain Showers: Moderate"},
    {id:82, value:"Rain Showers: violent"},
    {id:85, value:"Snow Showers: Slight"},
    {id:86, value:"Snow Showers: Heavy"},
    {id:95, value:"Thunderstorm"},
    {id:96, value:"Thunderstorm: Slight Hail"},
    {id:99, value:"Thunderstorm: Heavy Hail"},
  ]




  constructor(private weatherService: GetWeatherService) { }

  async ngOnInit() {
    this.getLocalWeather();
  }

  async getWeather() {
    this.weatherService.getWeatherByLatLon(this.latitude, this.longitude).subscribe((weather) => {
      this.weatherService.setSearchedWeather(weather.daily.temperature_2m_max[0], weather.daily.temperature_2m_min[0], this.translateWeatherCode(weather.daily.weathercode[0]));
      this.gotSearchedWeather.emit();
    },
    (error) => {
      this.displayError.emit();
    })
  }

  async getLocalWeather() {
    const coordinates: any = await this.weatherService.getLocation();
    this.weatherService.getWeatherByLatLon(coordinates.coords.latitude, coordinates.coords.longitude).subscribe((weather) => {
      this.weatherService.setLocalWeather(weather.daily.temperature_2m_max[0], weather.daily.temperature_2m_min[0], this.translateWeatherCode(weather.daily.weathercode[0]));
      this.gotLocalWeather.emit();
    })
  }

  translateWeatherCode(weatherCode: number): string {
    let code = this.weatherCodes.find(code => code.id === weatherCode) ?? {id:-1, value:'Unknown'};
    return code.value;
  }

}
