import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  redirect = false;

  isAuth$: Observable<boolean>;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFirestore,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userCollection = _db.collection('users');
    this.isAuth$ = this._auth.user.pipe(map((user) => !!user));

    // Get the data from manage route authOnly:true => For Authentication
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this._activatedRoute.firstChild),
        switchMap((route) => route?.data ?? of({ authOnly: false }))
      )
      .subscribe((data) => {
        this.redirect = data.authOnly ?? false;
      });
  }

  async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided');
    }
    const userCred = await this._auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    if (!userCred.user) {
      throw new Error("user can't be found");
    }

    await this.userCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logOut(e?: Event) {
    if (e) {
      e.preventDefault();
    }
    await this._auth.signOut();
    if (this.redirect) {
      await this._router.navigateByUrl('/');
    }
  }
}
