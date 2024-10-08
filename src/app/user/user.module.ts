import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModelComponent } from './auth-model/auth-model.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthModelComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [AuthModelComponent],
})
export class UserModule {}
