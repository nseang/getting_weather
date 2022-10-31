import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { LocationComponent } from './location/location.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GetWeatherService } from './get-weather.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherDisplayComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [GetWeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
