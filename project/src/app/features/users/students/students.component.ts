import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
