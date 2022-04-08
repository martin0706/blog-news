import { Component, OnInit } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news:any;
  id:any = this.route.snapshot.paramMap.get('id');

  constructor(private newsService: NewsService,private router: Router,private route: ActivatedRoute) { }

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
   
  ViewEditNews(news_id : any){
    let url: string = "/news/edit/" + news_id
         this.router.navigateByUrl(url);
    }

    deleteNews(news_id : any){
      this.newsService.delete(news_id)
      .then(() => {
        //this.refreshList.emit();
        //this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
  }
        
    

}
