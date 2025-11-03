import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FieldRow } from '../../services/mock-data.service';
import { MatDialog } from '@angular/material/dialog';
import {AppTypeEnum} from "../../shared/enums/app-type.enum";
import {TableEnum} from "../../shared/enums/table.enum";

@Component({
  selector: 'app-household',
  templateUrl: './household.component.html',
  styleUrls: ['./household.component.css']
})
export class HouseholdComponent {
  mode:  AppTypeEnum = AppTypeEnum.ARM;
  iinBin = '';
  tabIndex = 0;

  personal: FieldRow[] = [];
  protected readonly tableEnum = TableEnum;

  constructor(private ar: ActivatedRoute, private dialog: MatDialog){
    this.mode = (this.ar.snapshot.paramMap.get('mode') as any) || 'ARM';
    this.iinBin = this.ar.snapshot.paramMap.get('id') || '';
    this.personal = [
      { label: 'ИИН', value: this.iinBin, source: 'ARM', editable: true, code: 'questionLph10' },
    ];
  }

  save(){
    alert('Сохранено (демо). Здесь будет вызов API.');
  }
  back(){
    history.back();
  }
}
