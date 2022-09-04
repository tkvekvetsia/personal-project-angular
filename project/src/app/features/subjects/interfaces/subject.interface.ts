import { FormControl } from "@angular/forms";

export interface ISubjectForm{
    subject: FormControl<string>,
    lessons: FormControl<number | null>,
    description: FormControl<string>
}

export interface ISubject{
    subject: string,
    lessons: number,
    description: string,
    id?: number
}