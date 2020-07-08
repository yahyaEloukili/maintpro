import {IAnswer} from './answer';
import {IEditions} from "./Editions";

export interface IQuestion {
    id?: string;
    text: string;
    code?: string;
    metierId: string;
    studyCaseId?: string;
    image?: string[];
    editions?: string[] | IEditions[];
    type: TypeQst;
    createdAt?: string;
    updatedAt?: string;
    answers?: IAnswer[];
}
export enum TypeQst {
    CASE = 'CASE',
    SIMPLE = 'SIMPLE'
}
