
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(6px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SearchComponent {
  mode: 'ARM'|'SANAQ' = 'ARM';
  iinBin = '';
  id = '';
  constructor(private ar: ActivatedRoute, private router: Router) {
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'ARM';
  }
  back(){ history.back(); }
  onSearch(){   //
    const clean = (this.iinBin || '').replace(/\D/g,'').slice(0,12);
    if (clean.length !== 12) {
      alert('Введите 12 цифр ИИН/БИН');
      return;
    }

    this.router.navigate(['/household', this.mode, clean]);
  }
}
