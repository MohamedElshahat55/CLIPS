import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() modalId = '';
  constructor(public _modalService: ModalService) {}

  closeModal() {
    return this._modalService.isToggelingModal(this.modalId);
  }
}
