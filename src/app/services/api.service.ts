import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LicenseCodeResponse, LoginResponse, Plugin, UpdateUserLicense, User, UserLicenses } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLicenseCode(token: string) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.get<LicenseCodeResponse>(`/api/licenses/manual-activation/${token}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  getUsers() {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.get<User[]>('/api/users', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  getUser(userId: number) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.get<User>(`/api/users/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  createUser(creatUserData: any) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.post<User>('/api/users', creatUserData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  updateUser(updateUserData: any) {
    const access_token = localStorage.getItem('access_token')!;
    console.log(updateUserData)
    return this.http.put<User>('/api/users', updateUserData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  deleteUser(userId: number) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.delete<Plugin>(`/api/users/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  login(loginData: any) {
    return this.http.post<LoginResponse>('/api/auth/login', loginData);
  }

  getPlugins() {
    return this.http.get<Plugin[]>('/api/plugins');
  }

  createPlugin(createPluginData: any) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.post<Plugin>('/api/plugins', createPluginData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  updatePlugin(updatePluginData: any) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.put<Plugin>('/api/plugins', updatePluginData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  deletePlugin(pluginId: number) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.delete<Plugin>(`/api/plugins/${pluginId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }

  getUserLicenses(userId: number) {
    return this.http.get<UserLicenses>(`/api/licenses?userId=${userId}`);
  }

  updateUserLicenses(userLicensesData: any) {
    const access_token = localStorage.getItem('access_token')!;
    return this.http.post<UpdateUserLicense>('/api/licenses', userLicensesData, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${access_token}`)
    });
  }
}
