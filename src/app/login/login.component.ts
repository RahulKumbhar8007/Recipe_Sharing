import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any;
  message: any;
  url = "http://localhost:5000/Api/signIn";
  ngOnInit() {
    this.loginForm = new FormGroup({


      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }


  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }


  constructor(private http: HttpClient, private Uservice: UserService, private router: Router) {

  }


  loginData(loginForm: any) {
    console.log(loginForm);
    this.http.post(this.url, loginForm).subscribe((data: any) => {
      console.log(data);

      this.message = data.message;
      this.loginForm.reset();
      this.router.navigate(['/recipeForm']);
      if (data.jwttoken) {
        this.Uservice.login(data.jwttoken);

      }
    })
  }
}
