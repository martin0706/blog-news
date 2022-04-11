import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {INews} from '../services/news' 
import { Observable , from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private dbPath = '/news';

  newsRef: AngularFirestoreCollection<INews>;

  constructor(private db: AngularFirestore) {
    this.newsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<INews> {
    return this.newsRef;
  }

  getOne(id: string): any {
    return this.newsRef.doc(id).get();
  }

  create(news: INews): any {
    return this.newsRef.add({ ...news });
  }

  update(id: string, data: any): Promise<void> {
    return this.newsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.newsRef.doc(id).delete();
  }
}
