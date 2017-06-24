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

    constructor(private ls: LoginService) {
        ls.getAuthStatus().subscribe(success => console.log(ls.token));
    }

    private login(): void {
        this.ls.getToken(this.email, this.password);
    }

}