import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../shared/services/news.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
@Component({
  selector: 'app-content-news',
  templateUrl: './content-news.component.html',
  styleUrls: ['./content-news.component.css']
})
export class ContentNewsComponent implements OnInit {
  news: any = {
    title: null,
    urlImage: null,
    desc: null,
    author: "test"
  };

  id: any = this.route.snapshot.paramMap.get('id');
  constructor(private router: Router, private route: ActivatedRoute, private newsService: NewsService, private db: AngularFirestore) { }

  ngOnInit(): void {  
    this.db.collection("news").doc(this.id).get().subscribe(data=>{
        let newData: any = data.data();
        this.news.title = newData['title'];
        this.news.desc = newData['desc'];
        this.news.urlImage = newData['urlImage'];
        this.news.author = newData['author'];
        
    })
  }
  
}
