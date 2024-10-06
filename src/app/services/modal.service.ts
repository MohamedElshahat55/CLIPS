import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private visiable: boolean = false;

  isModalOpen() {
    return this.visiable;
  }

  isToggelingModal() {
    this.visiable = !this.visiable;
  }
}
