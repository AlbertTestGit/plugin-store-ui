import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicenseCodeResponse, LoginResponse, Plugin, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLicenseCode(token: string) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.get<LicenseCodeResponse>(`http://127.0.0.1:3000/api/licenses/manual-activation/${token}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  getUsers() {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.get<User[]>('http://127.0.0.1:3000/api/users', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  createUser(creatUserData: any) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.post<User>('http://127.0.0.1:3000/api/users', creatUserData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  updateUser(updateUserData: any) {
    const access_token = localStorage.getItem('access_token')!;
    console.log(updateUserData)
    return this.http.put<User>('http://127.0.0.1:3000/api/users', updateUserData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  login(loginData: any) {
    return this.http.post<LoginResponse>('http://127.0.0.1:3000/api/auth/login', loginData);
  }

  getPlugins() {
    return this.http.get<Plugin[]>('http://127.0.0.1:3000/api/plugins');
  }
}
