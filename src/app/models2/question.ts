import {IAnswer} from './answer';

export interface IQuestion {
    id?: string;
    text: string;
    code?: string;
    metierId: string;
    studyCaseId?: string;
    image?: string[];
    type: TypeQst;
    createdAt?: string;
    updatedAt?: string;
    answers?: IAnswer[];
}
export enum TypeQst {
    CASE = 'CASE',
    SIMPLE = 'SIMPLE'
}
