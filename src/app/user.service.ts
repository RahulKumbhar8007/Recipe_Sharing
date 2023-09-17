import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { }
  login(jwttoken: any) {
    localStorage.setItem('token', jwttoken,);


  }

  isUserLoggedIn() {
    return localStorage.getItem('token');

  }

  getUserData(token: string) {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`http://localhost:5000/api/getData`, { headers });
  }
}






