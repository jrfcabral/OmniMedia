import { Component } from '@angular/core';

import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string;
    password: string;

    constructor(ls: LoginService) {}

    public showData(){
        console.log(this.email)
        console.log(this.password)
    }
}