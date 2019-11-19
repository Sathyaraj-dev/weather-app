import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  cityDetails: any;
  isSpinner: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CityComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private weatherService: WeatherService ) {
    this.isSpinner = true;
    this.selectedCity(data);
   }

  ngOnInit() {
  }

  // To show the weather details for the selected city
  selectedCity(param: number) {
    this.weatherService.getCityData(param).subscribe(
      res => {
        this.isSpinner = false;
        this.cityDetails = res;
      },
      err => {
      }
    );
  }

}
