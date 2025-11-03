import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TableEnum} from "../../enums/table.enum";
import {ApiService, ZemlyaSanaqRequest} from "../../../services/api.service";
import {MatDialog} from "@angular/material/dialog";
import {SanaqEditDialogComponent} from "../../dialogs/sanaq-edit-dialog.component";
import {SanaqHistoryDialogComponent} from "../../dialogs/sanaq-history-dialog.component";
import {ArmLphData} from "../../models/arm-lph-data";

@Component({
  selector: 'arm-lph-data',
  standalone: true,
    imports: [
        DecimalPipe,
        LoadingSpinnerComponent,
        MatButton,
        MatIcon,
        NgForOf,
        NgIf
    ],
  templateUrl: './arm-lph-data.component.html',
  styleUrl: './arm-lph-data.component.css'
})
export class ArmLphDataComponent implements OnInit{
    @Input() iinBin: string;
    @Input() table: TableEnum;
    @Input() columnName: string;
    landRows: ArmLphData[] = [];
    landSummary?: { label: string; value: number };
    loading = false;
    constructor(private dialog: MatDialog, private api: ApiService) {
    }
    ngOnInit() {
        this.load();
    }

    load(){
        this.loading = true;
        this.api.loadArmLph(this.iinBin, this.table).subscribe(resp => {
            this.landRows = resp;
            this.loading = false;
        }, error => {
            this.loading = false;
        });
    }


    editLand(row: ArmLphData) {
        const ref = this.dialog.open(SanaqEditDialogComponent, {
            data: { value: String(row.value!), label: row.question + ' ' + row.questionOption },
            width: '560px',
            disableClose: true
        });

        ref.afterClosed().subscribe(v => {
            if (v === undefined || v === null) return;
            const payload = {
                value: v.value,
                comment: v.comment,
                answerId: row.id,
                columnName: row.questionCode + ' ' + row.question + ' ' + row.questionOption!,
                tableName: this.table
            } as ZemlyaSanaqRequest;

            this.api.saveArmLph(payload).subscribe(resp => {
                row.value = v.value;
            });

        });
    }

    totalLand() {
        return this.landRows.reduce((sum, row) => sum + Number(row.value || 0), 0);
    }

    openHistory() {
        let answerIds: number[] = [];
        this.landRows.forEach(item => {
            answerIds.push(item.id);
        })
        this.api.loadArmLphHistories(answerIds).subscribe(resp => {
            this.dialog.open(SanaqHistoryDialogComponent, {
                data: resp,
                width: '760px'
            });
        });
    }

    formatValue(value: string | number): string {
        const num = Number(value);
        return isNaN(num) ? String(value) : num.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    }
}
