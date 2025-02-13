import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // ✅ Import RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // ✅ Register RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
