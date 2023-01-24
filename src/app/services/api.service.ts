import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicenseCodeResponse, LoginResponse, Plugin, User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLicenseCode(token: string) {
    return this.http.get<LicenseCodeResponse>(`http://127.0.0.1:3000/api/licenses/manual-activation/${token}`);
  }

  getUsers() {
    return this.http.get<User[]>('http://127.0.0.1:3000/api/users');
  }

  createUser(creatUserData: any) {
    return this.http.post<User>('http://127.0.0.1:3000/api/users', creatUserData);
  }

  updateUser(updateUserData: any) {
    console.log(updateUserData)
    return this.http.put<User>('http://127.0.0.1:3000/api/users', updateUserData);
  }

  login(loginData: any) {
    return this.http.post<LoginResponse>('http://127.0.0.1:3000/api/auth/login', loginData);
  }

  getPlugins() {
    return this.http.get<Plugin[]>('http://127.0.0.1:3000/api/plugins');
  }
}
