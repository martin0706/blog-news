import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(public authService: AuthService,private router: Router) { }

  @Input() 
 
  ngOnInit(): void {
    console.log(this.authService.userData)
    this.isLoggedIn = !!this.authService.userData;
  
    
  }
  onSubmit(): void {
    const { email, password } = this.form;
    from(this.authService.SignIn(email, password)).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
}
