import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import {INews} from '../shared/services/news'
import { NewsService } from '../shared/services/news.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  form: any = {
    title: null,
    urlImage: null,
    desc:null,
    author: null,
    memberLaterReade: []
  };

  news: INews = this.form;
  submitted = false;

  constructor(private newsService: NewsService, authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(JSON.parse(localStorage['user']).email);
    this.news.author = JSON.parse(localStorage['user']).email;
    this.newsService.create(this.news).then(() => {
      console.log('Created new item successfully!');
      this.router.navigate(['']);
      this.submitted = true;
      this.form.title = '';
      this.form.desc = '';
      this.form.urlImage = '';
    });
  }

  // newTutorial(): void {
  //   this.submitted = false;
  //   this.news = new INews(fbfdbdbdf);
  // }
}
