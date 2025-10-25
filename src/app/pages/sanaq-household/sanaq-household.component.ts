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
      // this.applyResponse(st.household);
    } else {


    }
  }

  applyResponse(resp: ZemlyaSanaqResponse) {
    // this.data = resp;
    // this.iinBin = resp.meta.iinBin;

    // const personalSec = resp.sections.find(s => s.code === 'personal');
    // const landSec = resp.sections.find(s => s.code === 'land');
    // const bldSec = resp.sections.find(s => s.code === 'buildings');

    // this.personalRows = personalSec ? personalSec.rows : [];
    // this.landRows = landSec ? landSec.rows : [];
    // this.landSummary = landSec?.summary;
    // this.buildings = bldSec ? bldSec.rows : [];

    this.changes = [];
  }

  openHistory() {
    const mockHistory: SanaqHistoriesResponse[] = [
      { createdAt: new Date(), createdUserId: 'Иванов И.И.', columnName: 'Площадь пашни', valueOld: '60', valueNew: '65' } as SanaqHistoriesResponse,
      { createdAt: new Date(), createdUserId: 'Петров П.П.', columnName: 'Земля под постройками', valueOld: '1300', valueNew: '1400' } as SanaqHistoriesResponse
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
    });
  }





  save() {
    if (!this.changes.length) {
      alert('Нет изменений');
      return;
    }

    // const payload: SaveRequest = {
    //   iinBin: this.iinBin,
    //   changes: this.changes
    // };
    //
    // this.api.saveChanges(payload).subscribe(resp => {
    //   // this.applyResponse(resp);
    //   alert('Сохранено');
    // });
  }



  back() {
    history.back();
  }
}



