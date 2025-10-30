import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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
export interface ZemlyaSanaqResponse {
    iin: string
    katoValue: string
    katoName: string
    questionCode: string
    questionName: string
    optionName: string
    questionId: number
    questionOptionId: number
    personValue: number
    katoAvgValue: number;
    peerCount: number
    answerId: number;
}

export interface ZemlyaSanaqRequest {
    answerId: number;
    value: string;
    columnName:	string;
    comment: string;
}

export interface SanaqHistoriesResponse {
    id?: number;
    createdAt: Date,
    createdUserId: string,
    valueOld: string;
    valueNew: string;
    columnName: string;
    answerId?: number;
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

    loadHousehold(iinBin: string, table: string): Observable<ZemlyaSanaqResponse[]> {
        const payload = {
            iin: iinBin,
            tableName: table
        };
        const url = `${environment.apiUrl}/api/SanaqEdit`;
        return this.http.post<ZemlyaSanaqResponse[]>(url, payload);
    }

    saveChanges(payload: ZemlyaSanaqRequest) {
        return this.http.put<any>(environment.apiUrl + '/api/SanaqEdit', payload);
    }

    loadHistories(answerIds: number[]) {
        return this.http.post<SanaqHistoriesResponse[]>(environment.apiUrl + '/api/SanaqEdit/histories-by-answer-ids' , answerIds);
    }
}
