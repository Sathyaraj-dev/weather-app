import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { CityComponent } from '../city/city.component';
import { SearchComponent } from './search.component';


@NgModule({
  declarations: [
    CityComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [CityComponent],
})
export class SearchModule { }
