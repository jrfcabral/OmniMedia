import { Component } from '@angular/core';
declare var electron: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app '; 
  favoriteSeason = "lol"
  constructor() {
    console.log(electron);
    console.log("yolo")
  }
}
