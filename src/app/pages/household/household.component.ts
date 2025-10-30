import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MockDataService, FieldRow, BuildingRow, LandRow } from '../../services/mock-data.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AppTypeEnum} from "../../shared/enums/app-type.enum";

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent {
  mode:  AppTypeEnum = AppTypeEnum.ARM;
  id = '';
  tabIndex = 0;

  personal: FieldRow[] = [];
  land: LandRow[] = [];
  buildings: BuildingRow[] = [];

  editLand(row: any) {
    const ref = this.dialog.open(EditDialogComponent, {
      data: { value: String(row.value), label: row.name },
      width: '560px',
      disableClose: true
    });

    ref.afterClosed().subscribe(v => {
      
      if (v === undefined || v === null) return;
      const s = String(v).trim();
      if (s === '') return;

      const num = Number(s.replace(',', '.'));
      if (Number.isFinite(num)) {
        row.value = num;
      } else {
        alert('Введите корректное число');
      }
    });
  }




  constructor(private ar: ActivatedRoute, private api: MockDataService, private dialog: MatDialog){
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'ARM';
    this.id = this.ar.snapshot.paramMap.get('id') || '';
    this.load();
  }
  async load(){
    const res = await this.api.fetchById(this.mode, this.id);
    this.personal = res.personal;
    this.land = res.land;
    this.buildings = res.buildings;
  }
  totalLand(){ return this.land.reduce((s,e)=>s+Number(e.value||0),0); }
  openHistory = async () => {
    const rows = await this.api.history(this.id);
    this.dialog.open(HistoryDialogComponent, { data: rows, width: '760px' });
  };
  edit(row: FieldRow){
    const ref = this.dialog.open(EditDialogComponent, { data: { value: row.value, label: row.label } });
    ref.afterClosed().subscribe(v => { if(v!=null) row.value = v; });
  }
  save(){ alert('Сохранено (демо). Здесь будет вызов API.'); }
  back(){ history.back(); }
}

@Component({
  selector: 'app-history-dialog',
  template: `
    <h2 mat-dialog-title>История изменений</h2>
    <mat-dialog-content>
      <table class="table">
        <thead><tr><th>Дата и время</th><th>Пользователь</th><th>Поле</th><th>Старое значение</th><th>Новое значение</th></tr></thead>
        <tbody>
          <tr *ngFor="let r of data">
            <td>{{r.dt}}</td>
            <td>{{r.user}}</td>
            <td>{{r.field}}</td>
            <td style="color:#dc2626">{{r.oldVal}}</td>
            <td style="color:#16a34a">{{r.newVal}}</td>
          </tr>
        </tbody>
      </table>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close>Закрыть</button>
    </mat-dialog-actions>
  `
})
export class HistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}

@Component({
  selector: 'app-edit-dialog',
  template: `
    <h2 mat-dialog-title>Редактировать поле</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Текущее значение</mat-label>
        <input matInput [(ngModel)]="value">
      </mat-form-field>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Комментарий к изменению</mat-label>
        <textarea matInput rows="3" [(ngModel)]="comment" placeholder="Опишите причину изменения..."></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Отмена</button>
      <button mat-raised-button color="primary" (click)="save()">Сохранить</button>
    </mat-dialog-actions>
  `
})
export class EditDialogComponent {
  value = '';
  comment = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditDialogComponent>) {
    this.value = data?.value || '';
  }
  save(){ this.ref.close(this.value); }
}
