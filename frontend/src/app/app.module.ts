import { SearchComponent } from './search/search.component';
import { FileListEntry } from './fileList/fileListEntry.component';
import { SettingsService } from './services/settings.service';
import { BaseService } from './services/base.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserComponent } from './browser/browser.component';
import { FileComponent } from './browser/file.component';
import { PlayerComponent } from './player/player.component';
import { FileListComponent } from './fileList/fileList.component';

import { LoginService } from './services/login.service';
import { FileService } from './services/file.service';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';


const appRoutes: Routes = [ 
   {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Omnimedia: Login window' }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Omnimedia: Settings window' }
  },
  {
    path: 'browser',
    component: BrowserComponent,
    data: { title: 'Omnimedia: Browser window' }
  },
  { path: '',
    redirectTo: "/browser",
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'Omnimedia: Search Window'}
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    BrowserComponent,
    FileComponent,
    PlayerComponent,
    FileListComponent,
    FileListEntry,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,

  ],
  providers: [LoginService, FileService, BaseService, SettingsService],
  bootstrap: [AppComponent],
})
export class AppModule { }
