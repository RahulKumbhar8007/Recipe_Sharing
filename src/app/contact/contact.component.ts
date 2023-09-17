import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  user: any = "";
  message: any = "";
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
      const token: any = localStorage.getItem('token');

    if (token) {
      this.userService.getUserData(token).subscribe({
        next: (response: any) => {
          this.user = response;
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      }
      );
    }
  }

  sendMessage() {
    const token: any = this.userService.isUserLoggedIn();
    const headers = new HttpHeaders().set('Authorization', token);

    const messageData = { message: this.message };
    if (token) {

      this.http.post('http://localhost:5000/api/saveMessage', messageData, { headers }).subscribe({
        next: (response: any) => {  this.message = ""; },
        error: (error) => console.log(error)
      }
      )
    } else { }
  }
}





















