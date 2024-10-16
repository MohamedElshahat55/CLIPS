import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Authentication module
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Firestore module
import { environment } from '../environments/environment';
import { AboutComponent } from './components/about/about.component';
import { VideoModule } from './video/video.module';
import { HomeComponent } from './components/home/home.component';
import { ClipComponent } from './components/clip/clip.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    ClipComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase
    AngularFireAuthModule, // Optional, for Authentication
    AngularFirestoreModule, // Optional, for Firestore
    AngularFireStorageModule,
    VideoModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
