import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { v4 as uuid } from 'uuid';

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

  showAlert = false;
  alertMsg = 'Please wait! your clip is being uploaded.';
  alertColor = 'blue';
  isSubmission = false;

  constructor(private _storage: AngularFireStorage) {}

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
    this.alertMsg = 'Please wait! your account is being created.';
    this.showAlert = true;
    this.alertColor = 'blue';
    this.isSubmission = true;
    this.showProgress = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const task = this._storage.upload(clipPath, this.file);
    task.percentageChanges().subscribe((progress) => {
      this.progressPrecent = (progress as number) / 100;
    });

    task
      .snapshotChanges()
      .pipe(last())
      .subscribe({
        next: (snapshot) => {
          this.alertMsg =
            'Success! your clip is now ready to share with the world.';
          this.showAlert = true;
          this.alertColor = 'green';
          this.showProgress = false;
        },
        error: (error) => {
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
