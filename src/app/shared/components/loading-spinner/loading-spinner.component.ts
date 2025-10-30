import {Component, Input} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';


@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

  @Input() isLoading = false;

  constructor() {
  }


}
