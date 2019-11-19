import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { WeatherService } from '../service/weather.service';
import { CityComponent } from '../city/city.component';

interface cityList {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: number;
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  cityName = new FormControl('');
  searchCityQuery = new Subject<string>();
  filteredData:  cityList[];
  isSpinner: boolean = false;
  closeButton: boolean = false;

  constructor(private weatherService: WeatherService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.onChanges();
    this.searchFilters();
  }

  // To watch the form control changes
  onChanges() {
    this.cityName.valueChanges.subscribe(val => {
      this.searchCityQuery.next(val);
    });
  }

  // Debounce method to control the values
  searchFilters() {
    this.searchCityQuery
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.isSpinner = true;
          this.closeButton = true;
          this.getWeatherData(value);
        } else {
          this.isSpinner = false;
          this.closeButton = false;
          this.filteredData = null;
        }
    });
  }

  // To show the city list using this service
  getWeatherData(param: string) {
    this.weatherService.getWeatherData(param).subscribe(
      res => {
        this.isSpinner = false;
        this.filteredData = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // To open the dialog modal
  openDialog(cityId: number) {
    const dialogRef = this.dialog.open(CityComponent, {
      width: '1000px',
      height: '550px',
      data: cityId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // To clear the form
  clearForm () {
    this.filteredData = null;
    this.cityName.setValue('');
  }

}
