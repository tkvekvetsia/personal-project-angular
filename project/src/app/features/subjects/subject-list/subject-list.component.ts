import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
