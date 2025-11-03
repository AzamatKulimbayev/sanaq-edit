import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import {
  ApiService,
  HouseholdResponse,
  SanaqHistoriesResponse,
  ZemlyaSanaqResponse
} from '../../services/api.service';
import {SanaqHistoryDialogComponent} from "../../shared/dialogs/sanaq-history-dialog.component";
import {SanaqEditDialogComponent} from "../../shared/dialogs/sanaq-edit-dialog.component";
import {FormTypeEnum} from "../../shared/enums/form-type.enum";
import {AppTypeEnum} from "../../shared/enums/app-type.enum";
import {TableEnum} from "../../shared/enums/table.enum";

@Component({
  selector: 'app-sanaq-household',
  templateUrl: './sanaq-household.component.html',
  styleUrls: ['./sanaq-household.component.css']
})
export class SanaqHouseholdComponent {
  mode: AppTypeEnum = AppTypeEnum.SANAQ;
  iinBin = '';
  formType: FormTypeEnum | null = null;
  data!: HouseholdResponse;
  personalRows: any[] = [];
  tabIndex = 0;
  changes: Array<{ fieldId: string; newValue: any; comment?: string }> = [];
  tableEnum = TableEnum;
  constructor(
      private ar: ActivatedRoute,
      private dialog: MatDialog
  ) {
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || AppTypeEnum.SANAQ;
    this.iinBin = this.ar.snapshot.paramMap.get('id') || '';
    this.personalRows = [
      { label: 'ИИН', value: this.iinBin, source: 'ARM', editable: true, code: 'questionLph10' },
    ];
  }

  save() {
    if (!this.changes.length) {
      alert('Нет изменений');
      return;
    }
  }

  back() {
    history.back();
  }
}
