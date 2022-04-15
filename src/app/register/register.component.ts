import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.isSuccessful = !!this.authService.userData;


  }
  onSubmit(): void {
    console.log(this.form);
    if (this.form.password !== this.form.pswrepeat) {
      this.errorMessage = "Repeated password is wrong!"
    } else {
      const { email, password } = this.form;
      from(this.authService.SignUp(email, password)).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['']);
        },
        error: err => {
          console.log(err);
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  }
}