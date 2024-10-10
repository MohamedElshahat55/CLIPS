import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showAlert = false;
  alertMsg = 'Please wait! your account is being created.';
  alertColor = 'blue';
  isSubmission = false;
  constructor(private _auth: AngularFireAuth) {}

  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      //Testing193!
    ]),
  });

  get email() {
    return this.loginForm.controls.email;
  }
  get password() {
    return this.loginForm.controls.password;
  }

  async login() {
    const email = this.email?.value;
    const password = this.password?.value;
    this.showAlert = true;
    this.alertMsg = 'Please wait! You are logging you in.';
    this.alertColor = 'blue';
    this.isSubmission = true;

    if (email && password) {
      try {
        await this._auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        console.error('Login failed:', error);
        this.alertMsg = 'un expected error occurred, please try again!';
        this.isSubmission = false;
        this.alertColor = 'red';
        return;
      }
    } else {
      console.error('Email or password is missing');
    }
    this.alertMsg = 'Success! You are now logged  in.';
    this.alertColor = 'green';
  }
}
