import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
