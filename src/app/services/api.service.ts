import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface HouseholdResponse {
    meta: {
        iinBin: string;
        source: 'ARM' | 'SANAQ';
        kato: string;
    };
    sections: Array<{
        code: string;
        label: string;
        rows: any[];
        summary?: { label: string; value: number };
    }>;
}

export interface SaveRequest {
    iinBin: string;
    changes: Array<{
        fieldId: string;
        newValue: any;
        comment?: string;
    }>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) {}

    loadHousehold(iinBin: string) {
        return this.http.post<HouseholdResponse>('/api/household/load', { iinBin });
    }

    saveChanges(payload: SaveRequest) {
        return this.http.post<HouseholdResponse>('/api/household/update', payload);
    }
}
