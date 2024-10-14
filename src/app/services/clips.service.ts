import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipsService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private _db: AngularFirestore) {
    this.clipsCollection = _db.collection('clips');
  }

  createClip(clipData: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clipData);
  }
}
