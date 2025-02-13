import { Component, OnInit } from '@angular/core';
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
export class MapComponent implements OnInit {
  countryInfo: any = null; 
  mapPath = '/assets/world-map.svg'; 

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.fetchCountryData('US'); // ✅ Load default country (United States)
  }

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
            isoCode: data[1][0].id, // ✅ Country ISO Code
            longitude: data[1][0].longitude, // ✅ Longitude
            latitude: data[1][0].latitude // ✅ Latitude     
          };
        }
      },
      (error: any) => { 
        console.error('Error fetching country data:', error);
      }
    );
  }
}
