import { Component, OnInit } from '@angular/core';
import {INews} from '../shared/services/news'
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {
  form: any = {
    title: null,
    urlImage: null,
    desc:null,
    author: "test"
  };

  news: any = this.form;
  updated = false;
  id:any = this.route.snapshot.paramMap.get('id');

  constructor(private router: Router,private route: ActivatedRoute,private newsService: NewsService,private db: AngularFirestore) { }

  ngOnInit(): void {
     
    //const id= this.route.snapshot.paramMap.get('id');
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      let item = this.news = data.filter(n=>n.author === JSON.parse(localStorage['user']).email)
      .filter(data=>data.id==this.id)
      
        this.form.title = item[0].title;
        this.form.desc = item[0].desc;
        this.form.urlImage = item[0].urlImage;
      
      
    });
    
  }

  onSubmit(): void {

    let data = {
      title : this.form.title,
      desc:this.form.desc,
      urlImage: this.form.urlImage
    }

    console.log(JSON.parse(localStorage['user']).email);
    this.news.author = JSON.parse(localStorage['user']).email;

   this.db.collection("news").doc(this.id).update({...data}).then(data=>{
    this.router.navigate(['news']);
   })
    //console.log(this.news)

  //   this.newsService.update(this.id,JSON.stringify(data)).then(() => {
  //     console.log('Created new item successfully!');
     
  //     this.form.title = '';
  //     this.form.desc = '';
  //     this.form.urlImage = '';
  //   });
  }

}
