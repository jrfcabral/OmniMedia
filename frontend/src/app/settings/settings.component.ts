import { SettingsService } from './../services/settings.service';
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

    private authServer: string;

    constructor(public settingsService: SettingsService) {
      settingsService.getAuthServer().subscribe(server => this.authServer = server);
    }

    private settingsChanged(): void {
      this.settingsService.setAuthServer(this.authServer);
    }
}
