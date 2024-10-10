import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import IUser from '../../models/user.model';
import { passwordMatchValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private _authService: AuthService) {}

  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(90),
  ]);
  password = new FormControl('!', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm), //Testing193!
  ]);
  confirm_password = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);

  showAlert = false;
  alertMsg = 'Please wait! your account is being created.';
  alertColor = 'blue';
  isSubmission = false;

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    { validators: passwordMatchValidator }
  );

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! your account is being created.';
    this.alertColor = 'blue';
    this.isSubmission = true;

    try {
      await this._authService.createUser(this.registerForm.value as IUser);
    } catch (error) {
      console.error(error);
      this.showAlert = true;
      this.alertMsg = 'un expected error occurred, please try again!';
      this.isSubmission = false;

      return;
    }
    this.alertColor = 'green';
    this.alertMsg = 'Success! your account has been created!';
  }
}
