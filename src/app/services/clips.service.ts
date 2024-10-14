import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  AngularFirestoreCollection,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';

import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipsService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private _db: AngularFirestore, private _auth: AngularFireAuth) {
    this.clipsCollection = _db.collection('clips');
  }

  createClip(clipData: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clipData);
  }

  getUserClips() {
    return this._auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.clipsCollection.ref.where('uid', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }
}
