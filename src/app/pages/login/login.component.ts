import { environment } from './../../../environments/environment';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createDirective } from '@angular/compiler/src/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginService.barraProgreso.next("1");
    this.loginService.login("tatan", "12345").subscribe(data =>{
        //console.log(data);
        sessionStorage.setItem(environment.TOKEN, data);
        const helper = new JwtHelperService();

        const decodedToken = helper.decodeToken(data);
        const expirationDate = helper.getTokenExpirationDate(data);
        const isExpired = helper.isTokenExpired(data); 

        console.log(decodedToken);
        console.log(decodedToken.name);
       // console.log(expirationDate);
        //console.log(isExpired);

        this.loginService.barraProgreso.next("2");
        this.snackBar.open('Bienvenido', 'Info', {
          duration: 2000,
        });        
        this.router.navigate(['/inicial']);
    });
  }

}
