import {IAnswer} from './answer';
import {IQuestion, TypeQst} from './question';
import {IEditions} from './Editions';

export interface IStudyCase {
    id?: string;
    title: string;
    Problematic: string;
    code?: string;
    metierId: string;
    image?: string[];
    editions?: string[] | IEditions[];
    createdAt?: string;
    updatedAt?: string;
    questions?: IQuestion[];
}
