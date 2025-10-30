import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnChanges, OnDestroy {

  @Input() isLoading = false;
  isSlowLoading = false;
  private slowTimer: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      if (this.isLoading) {
        this.startTimer();
      } else {
        this.resetTimer();
      }
    }
  }

  private startTimer() {
    this.isSlowLoading = false;
    this.slowTimer = setTimeout(() => {
      this.isSlowLoading = true;
    }, 10000);
  }

  private resetTimer() {
    clearTimeout(this.slowTimer);
    this.isSlowLoading = false;
  }

  ngOnDestroy() {
    clearTimeout(this.slowTimer);
  }
}
