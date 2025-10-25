import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-sanaq-edit-dialog',
    template: `
    <h2 mat-dialog-title>Редактировать поле</h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Текущее значение</mat-label>
        <input matInput [(ngModel)]="editData.value">
      </mat-form-field>

      <mat-form-field appearance="outline" style="width:100%;">
        <mat-label>Комментарий к изменению</mat-label>
        <textarea
          matInput
          rows="3"
          [(ngModel)]="editData.comment"
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
    editData: SanaqEditDialogData= {value: '', comment: ''} as SanaqEditDialogData;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SanaqEditDialogData,
        private ref: MatDialogRef<SanaqEditDialogComponent>
    ) {
        this.editData.value = data?.value || '';
    }

    save() {
        this.ref.close(this.editData);
    }
}
export interface SanaqEditDialogData {
    value: string;
    comment: string;
}

