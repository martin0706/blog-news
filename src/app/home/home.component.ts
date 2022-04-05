import { Component, OnInit } from '@angular/core';
import {INews} from '../shared/services/news'
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news:any;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.news = data;
      console.log(this.news)
    });

  }

}
