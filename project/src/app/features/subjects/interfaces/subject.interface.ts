import { FormControl } from "@angular/forms";

export interface ISubjectForm{
    subject: FormControl<string>,
    lessons: FormControl<number | null>,
    description: FormControl<string>
}