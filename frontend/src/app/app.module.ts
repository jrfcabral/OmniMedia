import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';

import { LoginService } from './login.service';

const appRoutes: Routes = [ 
   {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Omnimedia: Login window' }
  },
  { path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule { }
