import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  // Services to display the filtered cities
  getWeatherData(param: string) {
    return this.http.get<any>(this.BASE_URL + `/search?keyword=${param}`)
        .pipe(map(res => {
          return res;
      }));
  }

  // Services to display the specific city weather data
  getCityData(param: number) {
    return this.http.get(this.BASE_URL + `/location?woeid=${param}`);
  }
}
