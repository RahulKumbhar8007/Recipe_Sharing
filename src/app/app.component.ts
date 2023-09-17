import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application3';
  navOpen= false;
  constructor(public Uservice: UserService, private router: Router) {

  }
    logout() {
     localStorage.removeItem('token');
      this.router.navigate(['/home']);
       }
 
  popup() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }
  navBarOpen(){
    this.navOpen=!this.navOpen
  }
}
