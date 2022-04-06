import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news:any;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.news = data.filter(n=>n.author === JSON.parse(localStorage['user']).email);
      console.log(this.news)
    });

  }


}
