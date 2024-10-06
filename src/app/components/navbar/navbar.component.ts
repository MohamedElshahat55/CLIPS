import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public _modalService: ModalService) {}

  openModal(e: Event) {
    e.preventDefault();
    this._modalService.isToggelingModal('auth');
  }
}
