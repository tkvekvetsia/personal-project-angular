import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
