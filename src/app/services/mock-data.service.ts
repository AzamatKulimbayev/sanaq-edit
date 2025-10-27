
import { Injectable } from '@angular/core';

export type Mode = 'ARM' | 'SANAQ';

export interface FieldRow { label: string; value: string; source: Mode | 'CANON'; editable?: boolean; code?: string; }
export interface LandRow { name: string; value: number; }
export interface BuildingRow { name: string; qty: number; area: number; source: Mode; }
export interface LandRow {
  name: string;
  value: number;
  avgKato?: number;
}


@Injectable({ providedIn: 'root' })
export class MockDataService {
  async fetchById(mode: Mode, id: string) {
    const personal: FieldRow[] = [
      { label: 'ИИН', value: '800325400487', source: 'ARM', editable: true, code: 'questionLph10' },
      { label: 'Пол', value: 'Женский', source: 'ARM', editable: true, code: 'questionLph11' },
      { label: 'ФИО', value: 'Абылкасымова Карлыган', source: 'ARM', editable: true, code: 'questionLph10A' },
      { label: 'Возраст', value: '45', source: 'ARM', editable: true, code: 'questionLph10B' },
    ];
    const land: LandRow[] = [
      { name: '1. Общая площадь земли', value: 1470.0, avgKato: 1520  },
      { name: '1.1. Пашня', value: 65.0, avgKato: 170 },
      { name: '1.2. Многолетние насаждения', value: 30.0, avgKato: 198 },
      { name: '1.5. Залежь', value: 1235.0, avgKato: 2500 },
      { name: '1.6. Земля под постройками', value: 1400, avgKato: 190 },
    ];
    const buildings: BuildingRow[] = [
      { name: 'Помещения для содержания нескольких видов скота', qty: 1, area: 60, source: 'ARM' }
    ];
    return { personal, land, buildings };
  }

  async history(id: string) {
    return [
      { dt: '2025-01-15 14:30', user: 'Иванов И.И.', field: 'ИИН', oldVal: '800325400486', newVal: '800325400487' },
      { dt: '2025-01-14 10:20', user: 'Петров П.П.', field: 'Площадь земли', oldVal: '1400', newVal: '1470' },
    ];
  }
}
