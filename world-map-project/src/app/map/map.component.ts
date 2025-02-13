import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class MapComponent implements OnInit, AfterViewInit {
  countryInfo: any = null; 
  mapPath = '/assets/world-map.svg';

  constructor(private countryService: CountryService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchCountryData('US'); // ✅ Load default country (United States)
  }

  ngAfterViewInit() {
    this.attachCountryClickHandlers();
  }

  attachCountryClickHandlers() {
    const svgMap: any = document.getElementById('svgMap');

    if (svgMap) {
      svgMap.addEventListener('load', () => {
        const svgDoc = svgMap.contentDocument || svgMap.getSVGDocument();
        if (svgDoc) {
          const countries = svgDoc.querySelectorAll('path');
          countries.forEach((country: any) => {
            country.addEventListener('mouseenter', () => {
              country.style.fill = "rgba(0, 123, 255, 0.5)";
            });
            country.addEventListener('mouseleave', () => {
              country.style.fill = "";
            });
            country.addEventListener('click', () => {
              const countryCode = country.getAttribute('id');
              if (countryCode) {
                this.fetchCountryData(countryCode.toLowerCase());
              }
            });
          });
        }
      });
    }
  }

  fetchCountryData(countryCode: string) {
    console.log(`Fetching data for country: ${countryCode}`);

    this.countryService.getCountryData(countryCode).subscribe(
      (data: any) => {  
        console.log('API Response:', data);
        if (data && data[1]) {
          this.countryInfo = {
            name: data[1][0].name,               
            capital: data[1][0].capitalCity,     
            region: data[1][0].region.value,     
            incomeLevel: data[1][0].incomeLevel.value, 
            isoCode: data[1][0].id, 
            longitude: data[1][0].longitude, 
            latitude: data[1][0].latitude 
          };
          this.cdr.detectChanges(); // ✅ Ensures UI updates
        } else {
          console.error(`No data found for country code: ${countryCode}`);
        }
      },
      (error: any) => { 
        console.error('Error fetching country data:', error);
      }
    );
  }
}


