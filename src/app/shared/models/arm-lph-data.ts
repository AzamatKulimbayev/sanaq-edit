export interface ArmLphData {
    id: number;
    kato: string;
    nameRu: string;
    kato3: string;
    kato4: string;
    kato5: string;
    kato6?: string | null;
    address: string;
    interviewDate?: string | null; // ISO строка даты
    iu: string;
    su: string;
    formType: string;
    page?: number | null;
    rowNo?: number | null;
    questionCode: string;
    pageTextRu: string;
    question: string;
    typeIzm?: string | null;
    textRu: string;
    questionOption?: string | null;
    value: string;
    iin: string;
}
