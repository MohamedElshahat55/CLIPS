import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blocker]',
})
export class EventBlokerDirective {
  constructor() {}

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent($event: Event) {
    $event.preventDefault();
  }
}
