import { Component, OnInit } from '@angular/core';
import { INews } from '../shared/services/news'
import { NewsService } from '../shared/services/news.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ChangeDetectorRef } from '@angular/core'
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  news: any;
  isReadLetar = false;
  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute, private db: AngularFirestore, private cdr: ChangeDetectorRef, public authService: AuthService) { }

  ngOnInit(): void {
    this.newsService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      )
      )
    ).subscribe(data => {
      if (!!this.authService.userData) {
        data = data.map(function (d) {
          d['isCheck'] = d.memberLaterReade.indexOf(JSON.parse(localStorage['user']).uid) > -1;
          return d;
        })
      }


      this.news = data;
      //console.log(this.news)

    });

  }

  ViewContentNews(news_id: any) {
    console.log(news_id)
    let url: string = "/news/" + news_id
    this.router.navigateByUrl(url);
  }

  AddNews(news_id: any): void {

    console.log(news_id)

    // this.db.collection("news").doc(news_id).get().subscribe(data => {

    //     let newData: any = data.data();
    //     if(newData.memberLaterReade.includes(JSON.parse(localStorage['user']).uid)){
    //       newData.memberLaterReade = newData.memberLaterReade.filter(function(item:any) {
    //         return item !== JSON.parse(localStorage['user']).uid
    //     })
    //       //newData.memberLaterReade.remove(JSON.parse(localStorage['user']).uid);
    //     }else{
    //       newData.memberLaterReade.push(JSON.parse(localStorage['user']).uid);
    //     }
    //     console.log(newData)

    //     this.db.collection("news").doc(news_id).update({...newData}).then(data => {

    //     })

    //   })

    this.newsService.getOne(news_id).toPromise().then(data => {

      let newData: any = data.data();
      if (newData.memberLaterReade.includes(JSON.parse(localStorage['user']).uid)) {
        newData.memberLaterReade = newData.memberLaterReade.filter(function (item: any) {
          return item !== JSON.parse(localStorage['user']).uid
        })
        //newData.memberLaterReade.remove(JSON.parse(localStorage['user']).uid);
      } else {
        newData.memberLaterReade.push(JSON.parse(localStorage['user']).uid);
      }
      // console.log(newData)
      return newData;
      // this.db.collection("news").doc(news_id).update({...newData}).then(data => {

      // })

    }).then(newData => {
      this.db.collection("news").doc(news_id).update({ ...newData })
    })



  }

  issuesTab(e: Event) {
    e.stopPropagation()
  }

  // action(event:any): void {
  //   event.stopPropagation();
  // }

}
