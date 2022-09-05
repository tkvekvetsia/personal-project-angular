import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { ISubject } from '../interfaces/subject.interface';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsComponent implements OnInit {
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addState$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  subjects$: BehaviorSubject<ISubject[]> = new BehaviorSubject([] as ISubject[]);
  constructor(private subjectService: SubjectService) {}

  private getAllSubject(): void{
    this.subjectService.getAllSubject().pipe(
      tap((v) => {
        this.subjects$.next(v);
      }),
      catchError(()=>{
        this.errorMessage$.next(true);
        return of(null)
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.getAllSubject();
  }


  public addSubject(subject:ISubject): void {
    this.subjectService.addSubject(subject).pipe(
      tap((v)=>{
        this.addState$.next(false);
        this.subjects$.next([...this.subjects$.getValue(), v]);
        alert('Added successfully');
      }),
      catchError((e) => {
        // console.log(e);
        alert(
          `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
        );
        return of(null);
      })
    ).subscribe()
    
  }

  onChangeAddState(value: boolean){
    this.addState$.next(value);
  }

  public onDeleteSubject(id: number): void{
    this.subjectService.deleteSubject(id).pipe(
      tap(v=>{
        console.log(v);
        this.getAllSubject();
      }),
      catchError((e)=>{
        alert(
          `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
        );
        return of(null)
      })

    ).subscribe();
  }
}
