import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-model',
  templateUrl: './auth-model.component.html',
  styleUrl: './auth-model.component.css',
})
export class AuthModelComponent {
  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {
    this._modalService.register('auth');
  }

  ngOnDestroy(): void {
    this._modalService.unRegister('auth');
  }
}
