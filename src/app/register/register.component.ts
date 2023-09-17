import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: any;
  toMessage: any;
  url = "http://localhost:5000/Api/addDetails";
  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(""),
     

      email: new FormControl("", [Validators.required, Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9]+$/)]),
      password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern(/[A-Za-z0-9]+$/)])
    })
  }
  get name() {
    return this.userForm.get('name');
  }
 get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }

  constructor(private http: HttpClient,private router: Router) {

  }



  Data(userForm: any) {
    console.log(userForm);
    this.http.post(this.url, userForm).subscribe((data: any) => {
     
     if (data.AlreadyRegisterMessage) {
        this.toMessage = data.AlreadyRegisterMessage;
        this.userForm.reset();
      }else if(data.message){
          this.router.navigate(['/login']);
      }
    })
  }

}
