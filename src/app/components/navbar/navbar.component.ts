import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { JwtPayload } from 'src/app/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  jwtUser: JwtPayload | undefined;
  isAuthenticated = false

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.isAuthenticated = true;
      const decode = jwt_decode<JwtPayload>(token);
      this.jwtUser = decode;
      // console.log(new Date((new Date(0)).setUTCSeconds(decode.exp)));
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('access_token');
    this.router.navigate(['login'])
  }
}
