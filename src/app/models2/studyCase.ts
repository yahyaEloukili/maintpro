import {IAnswer} from './answer';
import {IQuestion, TypeQst} from './question';

export interface IStudyCase {
    id?: string;
    title: string;
    Problematic: string;
    code?: string;
    metierId: string;
    image?: string[];
    createdAt?: string;
    updatedAt?: string;
    questions?: IQuestion[];
}
