
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-source-select',
  templateUrl: './source-select.component.html',
  styleUrls: ['./source-select.component.css']
})
export class SourceSelectComponent {
  constructor(private router: Router) {}

  go(mode: 'ARM' | 'SANAQ') {
    if (mode === 'SANAQ') {

      this.router.navigate(['/sanaq-search', mode]);
    } else {

      this.router.navigate(['/search', mode]);
    }
  }
}

