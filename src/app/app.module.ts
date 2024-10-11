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

@NgModule({
  declarations: [AppComponent, NavbarComponent, AboutComponent, HomeComponent, ClipComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    VideoModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase
    AngularFireAuthModule, // Optional, for Authentication
    AngularFirestoreModule, // Optional, for Firestore
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
