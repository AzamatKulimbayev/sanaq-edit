import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ApiService, HouseholdResponse, SaveRequest } from '../../services/api.service';

@Component({
  selector: 'app-sanaq-household',
  templateUrl: './sanaq-household.component.html',
  styleUrls: ['./sanaq-household.component.css']
})
export class SanaqHouseholdComponent {
  mode: 'ARM' | 'SANAQ' = 'SANAQ';
  iinBin = '';
  formType: 'LPH' | 'SHP' | null = null;

  data!: HouseholdResponse;

  personalRows: any[] = [];
  landRows: any[] = [];
  landSummary?: { label: string; value: number };
  buildings: any[] = [];

  tabIndex = 0;

  changes: Array<{ fieldId: string; newValue: any; comment?: string }> = [];

  constructor(
      private ar: ActivatedRoute,
      private router: Router,
      private api: ApiService,
      private dialog: MatDialog
  ) {
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'SANAQ';
    this.iinBin = this.ar.snapshot.paramMap.get('id') || '';

    const nav = this.router.getCurrentNavigation();
    const st = nav?.extras?.state as { household?: HouseholdResponse; formType?: 'LPH'|'SHP' };

    if (st?.household) {
      this.formType = st.formType ?? null;
      this.applyResponse(st.household);
    } else {

      this.api.loadHousehold(this.iinBin /*, this.formType*/).subscribe(resp => {
        this.applyResponse(resp);
      });
    }
  }

  applyResponse(resp: HouseholdResponse) {
    this.data = resp;
    this.iinBin = resp.meta.iinBin;

    const personalSec = resp.sections.find(s => s.code === 'personal');
    const landSec = resp.sections.find(s => s.code === 'land');
    const bldSec = resp.sections.find(s => s.code === 'buildings');

    this.personalRows = personalSec ? personalSec.rows : [];
    this.landRows = landSec ? landSec.rows : [];
    this.landSummary = landSec?.summary;
    this.buildings = bldSec ? bldSec.rows : [];

    this.changes = [];
  }

  openHistory() {
    const mockHistory = [
      { dt: '2025-01-15 14:30', user: 'Иванов И.И.', field: 'Площадь пашни', oldVal: '60', newVal: '65' },
      { dt: '2025-01-14 10:20', user: 'Петров П.П.', field: 'Земля под постройками', oldVal: '1300', newVal: '1400' }
    ];

    this.dialog.open(SanaqHistoryDialogComponent, {
      data: mockHistory,
      width: '760px'
    });
  }

  editPersonal(row: any) {
    if (!row.editable) return;

    const ref = this.dialog.open(SanaqEditDialogComponent, {
      data: { value: row.value, label: row.label },
      width: '560px',
      disableClose: true
    });

    ref.afterClosed().subscribe(v => {
      if (v === undefined || v === null) return;
      const s = String(v).trim();
      if (!s) return;

      row.value = s;
      this.upsertChange(row.fieldId, s);
    });
  }

  editLand(row: any) {
    const ref = this.dialog.open(SanaqEditDialogComponent, {
      data: { value: String(row.value), label: row.name },
      width: '560px',
      disableClose: true
    });

    ref.afterClosed().subscribe(v => {
      if (v === undefined || v === null) return;
      const s = String(v).trim();
      if (!s) return;

      const num = Number(s.replace(',', '.'));
      if (!Number.isFinite(num)) {
        alert('Введите корректное число');
        return;
      }

      row.value = num;
      this.upsertChange(row.fieldId, num);
    });
  }

  upsertChange(fieldId: string, newValue: any, comment?: string) {
    const idx = this.changes.findIndex(c => c.fieldId === fieldId);
    if (idx === -1) {
      this.changes.push({ fieldId, newValue, comment });
    } else {
      this.changes[idx].newValue = newValue;
      if (comment) this.changes[idx].comment = comment;
    }
  }

  save() {
    if (!this.changes.length) {
      alert('Нет изменений');
      return;
    }

    const payload: SaveRequest = {
      iinBin: this.iinBin,
      changes: this.changes
    };

    this.api.saveChanges(payload).subscribe(resp => {
      this.applyResponse(resp);
      alert('Сохранено');
    });
  }

  totalLand() {
    return this.landRows.reduce((sum, row) => sum + Number(row.value || 0), 0);
  }

  back() {
    history.back();
  }
}



@Component({
  selector: 'app-sanaq-history-dialog',
  template: `
    <h2 mat-dialog-title>История изменений</h2>
    <mat-dialog-content>
      <table class="table">
        <thead>
        <tr>
          <th>Дата и время</th>
          <th>Пользователь</th>
          <th>Поле</th>
          <th>Старое значение</th>
          <th>Новое значение</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let r of data">
          <td>{{ r.dt }}</td>
          <td>{{ r.user }}</td>
          <td>{{ r.field }}</td>
          <td style="color:#dc2626">{{ r.oldVal }}</td>
          <td style="color:#16a34a">{{ r.newVal }}</td>
        </tr>
        </tbody>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close>Закрыть</button>
    </mat-dialog-actions>
  `
})
export class SanaqHistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'app-sanaq-edit-dialog',
  template: `
    <h2 mat-dialog-title>Редактировать поле</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Текущее значение</mat-label>
        <input matInput [(ngModel)]="value">
      </mat-form-field>

      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Комментарий к изменению</mat-label>
        <textarea
          matInput
          rows="3"
          [(ngModel)]="comment"
          placeholder="Опишите причину изменения...">
        </textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Отмена</button>
      <button mat-raised-button color="primary" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `
})
export class SanaqEditDialogComponent {
  value = '';
  comment = '';

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private ref: MatDialogRef<SanaqEditDialogComponent>
  ) {
    this.value = data?.value || '';
  }

  save() {
    this.ref.close(this.value);
  }
}


