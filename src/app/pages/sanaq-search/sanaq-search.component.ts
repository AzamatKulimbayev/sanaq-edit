import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiService } from '../../services/api.service'; // <- важно

@Component({
  selector: 'app-sanaq-search',
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
  mode: 'ARM' | 'SANAQ' = 'SANAQ';
  formType: 'LPH' | 'SHP' | null = null;

  iinBin = '';
  loading = false;
  errorMsg = '';

  constructor(
      private ar: ActivatedRoute,
      private router: Router,
      private api: ApiService,
  ) {

    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'SANAQ';
  }

  back() {
    history.back();
  }

  selectForm(type: 'LPH' | 'SHP') {
    this.formType = type;

  }

  onSearch() {
    const clean = (this.iinBin || '').replace(/\D/g, '').slice(0, 12);

    if (clean.length !== 12) {
      this.errorMsg = 'Введите 12 цифр ИИН/БИН';
      return;
    }

    if (!this.formType) {
      this.errorMsg = 'Выберите форму (ЛПХ или СХП)';
      return;
    }

    this.errorMsg = '';
    this.loading = true;


    this.api.loadHousehold(clean).subscribe({
      next: resp => {
        debugger
        this.loading = false;


        this.router.navigate(
            ['/sanaq-household', this.mode, clean],
            // { state: { household: resp, formType: this.formType } }
        );
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Не удалось получить данные. Проверьте ИИН/БИН или попробуйте позже.';
      }
    });
  }
}
