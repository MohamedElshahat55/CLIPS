import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TapsContainerComponent } from './taps-container/taps-container.component';
import { TapComponent } from './tap/tap.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { EventBlokerDirective } from './event-blocker.directive';

@NgModule({
  declarations: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    EventBlokerDirective,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ModalComponent,
    TapsContainerComponent,
    TapComponent,
    InputComponent,
    AlertComponent,
    EventBlokerDirective,
  ],
})
export class SharedModule {}
