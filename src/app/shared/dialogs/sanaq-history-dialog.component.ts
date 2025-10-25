import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SanaqHistoriesResponse} from "../../services/api.service";


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
          <td>{{ r.createdAt | date: 'dd.MM.yyyy HH:mm'}}</td>
          <td>{{ r.createdUserId }}</td>
          <td>{{ r.columnName }}</td>
          <td style="color:#dc2626">{{ r.valueOld }}</td>
          <td style="color:#16a34a">{{ r.valueNew }}</td>
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
    constructor(@Inject(MAT_DIALOG_DATA) public data: SanaqHistoriesResponse[]) {}
}
