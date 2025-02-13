import { Component } from '@angular/core';
import { CommonModule, NgIf, CurrencyPipe } from '@angular/common'; 
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, NgIf, CurrencyPipe], 
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [CountryService] 
})
export class MapComponent {
  countryInfo: any = null; 

  constructor(private countryService: CountryService) {}

  // Fetch country data when a country is clicked
  fetchCountryData(countryCode: string) {
    this.countryService.getCountryData(countryCode).subscribe(
      (data: any) => {  
        if (data && data[1]) {
          this.countryInfo = {
            name: data[1][0].name,               
            capital: data[1][0].capitalCity,     
            region: data[1][0].region.value,     
            incomeLevel: data[1][0].incomeLevel.value, 
            population: data[1][0].population,   
            gdp: data[1][0].gdp                 
          };
        }
      },
      (error: any) => { 
        console.error('Error fetching country data:', error);
      }
    );
  }
}
