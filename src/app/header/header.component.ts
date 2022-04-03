import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Observable,BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  

  constructor(public authService: AuthService) {
      
   }

  ngOnInit() {
   // this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  // onLogout() {
  //   this.authService.SignOut();
  // }
}
