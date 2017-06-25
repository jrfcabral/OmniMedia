import { Component } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../services/login.service';




@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string;
    password: string;

    constructor(private ls: LoginService, private router: Router) {
        ls.getAuthStatus().subscribe(success => console.log(ls.token));
    }

    private login(): void {
        this.ls.getToken(this.email, this.password);
        this.router.navigateByUrl('/browser');
    }

}