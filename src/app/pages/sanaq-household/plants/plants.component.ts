import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

import {MatDialog} from "@angular/material/dialog";
import {ApiService, ZemlyaSanaqRequest, ZemlyaSanaqResponse} from "../../../services/api.service";
import {SanaqEditDialogComponent} from "../../../shared/dialogs/sanaq-edit-dialog.component";
import {SanaqHistoryDialogComponent} from "../../../shared/dialogs/sanaq-history-dialog.component";
import {TableEnum} from "../../../shared/enums/table.enum";

@Component({
  selector: 'land',
  standalone: true,
    imports: [
        DecimalPipe,
        MatButton,
        MatIcon,
        NgForOf,
        NgIf
    ],
  templateUrl: './plants.component.html',
  styleUrl: './plants.component.css'
})
export class PlantsComponent implements OnInit {
    @Input() iinBin: string;
    @Input() table: TableEnum;
    landRows: ZemlyaSanaqResponse[] = [];
    landSummary?: { label: string; value: number };
    constructor(private dialog: MatDialog, private api: ApiService) {
    }
    ngOnInit() {
        this.load();
    }

    load(){
        this.api.loadHousehold(this.iinBin, this.table).subscribe(resp => {
            this.landRows = resp;
        });
    }


    editLand(row: ZemlyaSanaqResponse) {
        const ref = this.dialog.open(SanaqEditDialogComponent, {
            data: { value: String(row.personValue), label: row.questionCode + ' ' + row.questionName },
            width: '560px',
            disableClose: true
        });

        ref.afterClosed().subscribe(v => {
            if (v === undefined || v === null) return;

            const payload = {
                value: v.value,
                comment: v.comment,
                answerId: row.answerId,
                columnName: row.questionCode + ' ' + row.questionName,
                tableName: this.table
            } as ZemlyaSanaqRequest;

            this.api.saveChanges(payload).subscribe(resp => {
                row.personValue = v.value;
            });

        });
    }

    totalLand() {
        return this.landRows.reduce((sum, row) => sum + Number(row.personValue || 0), 0);
    }

    openHistory() {
        let answerIds: number[] = [];
        this.landRows.forEach(item => {
            answerIds.push(item.answerId);
        })
        this.api.loadHistories(answerIds).subscribe(resp => {
            this.dialog.open(SanaqHistoryDialogComponent, {
                data: resp,
                width: '760px'
            });
        });
    }
}
