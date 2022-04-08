import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.css']
})
export class ReadLaterComponent implements OnInit {

  news: any;
  id: any = this.route.snapshot.paramMap.get('id');
  
  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    ).subscribe(data => {
     this.news = data.filter(n=>n.memberLaterReade.includes(JSON.parse(localStorage['user']).uid))
     console.log(this.news)
    });

  }

  ViewNews(news_id: any) {
    console.log(news_id)
    let url: string = "/news/" + news_id
    this.router.navigateByUrl(url);
  }


}
