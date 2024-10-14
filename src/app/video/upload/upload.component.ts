import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap, timestamp } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipsService } from '../../services/clips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  isDragOver = false;
  nextStep = false;
  file: File | null = null;
  progressPrecent = 0;
  showProgress = false;
  user: firebase.User | null = null;

  showAlert = false;
  alertMsg = 'Please wait! your clip is being uploaded.';
  alertColor = 'blue';
  isSubmission = false;

  constructor(
    private _storage: AngularFireStorage,
    private _auth: AngularFireAuth,
    private _clipsService: ClipsService,
    private _router: Router
  ) {
    _auth.user.subscribe((user) => (this.user = user));
  }

  title = new FormControl('', [Validators.required, Validators.minLength(3)]);

  uploadForm = new FormGroup({
    title: this.title,
  });

  storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '') // remove the extension fron title of file
    );
    this.nextStep = true;
  }

  uploadFile() {
    this.uploadForm.disable();

    this.alertMsg = 'Please wait! your account is being created.';
    this.showAlert = true;
    this.alertColor = 'blue';
    this.isSubmission = true;
    this.showProgress = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const task = this._storage.upload(clipPath, this.file);
    // store info about the clip to database
    const clipRef = this._storage.ref(clipPath);

    task.percentageChanges().subscribe((progress) => {
      this.progressPrecent = (progress as number) / 100;
    });

    task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value as string,
            fileName: `${clipFileName}.mp4`,
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };

          const clipRef = await this._clipsService.createClip(clip);

          this.alertMsg =
            'Success! your clip is now ready to share with the world.';
          this.showAlert = true;
          this.alertColor = 'green';
          this.showProgress = false;
          setTimeout(() => {
            this._router.navigate(['clip', clipRef.id]);
          }, 1000);
          console.log(clip);
        },
        error: (error) => {
          this.uploadForm.enable();
          this.alertMsg = 'Upload failed! please try again later.';
          this.showAlert = true;
          this.alertColor = 'red';
          this.showProgress = false;
          this.isSubmission = false;
          console.error(error);
        },
      });
  }
}
