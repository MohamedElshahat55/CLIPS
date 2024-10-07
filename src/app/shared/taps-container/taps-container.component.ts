import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TapComponent } from '../tap/tap.component';

@Component({
  selector: 'app-taps-container',
  templateUrl: './taps-container.component.html',
  styleUrl: './taps-container.component.css',
})
export class TapsContainerComponent implements AfterContentInit {
  @ContentChildren(TapComponent) taps: QueryList<TapComponent> =
    new QueryList();

  ngAfterContentInit(): void {
    const activeTaps = this.taps.filter((tap) => tap.activeTap);
    if (!activeTaps || this.taps.length === 0) {
      this.selectTap(this.taps!.first);
    }
  }

  selectTap(tap: TapComponent) {
    this.taps?.forEach((tap) => {
      tap.activeTap = false;
    });
    tap.activeTap = true;

    return false;
  }
}
