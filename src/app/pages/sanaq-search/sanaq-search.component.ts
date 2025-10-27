
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-search',
  templateUrl: './sanaq-search.component.html',
  styleUrls: ['./sanaq-search.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(6px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SanaqSearchComponent {
  mode: 'ARM'|'SANAQ' = 'SANAQ';
  formType: 'LPH'|'SHP'|null = null;
  iinBin = '';
  // mode: string;

  constructor(private ar: ActivatedRoute, private router: Router) {
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'SANAQ';
  }
  back(){ history.back(); }
  selectForm(type: 'LPH'|'SHP') { this.formType = type; }

  onSearch(){   // <<< нужно для (ngSubmit)
    const clean = (this.iinBin || '').replace(/\D/g,'').slice(0,12);
    if (clean.length !== 12) {
      alert('Введите 12 цифр ИИН/БИН');
      return;
    }




  this.router.navigate(['/sanaq-household', this.mode, clean]);
}
}

