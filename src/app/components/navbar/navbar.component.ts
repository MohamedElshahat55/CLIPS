import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    public _modalService: ModalService,
    public _authService: AuthService
  ) {}

  openModal(e: Event) {
    e.preventDefault();
    this._modalService.isToggelingModal('auth');
  }
}
