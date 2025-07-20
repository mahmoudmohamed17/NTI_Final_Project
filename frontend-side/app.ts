import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './auth/auth';


@Component({
  selector: 'app-root',
  imports: [Auth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
