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

import { LoginService } from './services/login.service';
import { FileService } from './services/file.service';


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
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingsComponent,
    BrowserComponent,
    FileComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LoginService, FileService],
  bootstrap: [AppComponent],
})
export class AppModule { }
