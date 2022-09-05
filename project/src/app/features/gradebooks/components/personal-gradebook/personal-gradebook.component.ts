import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-gradebook',
  templateUrl: './personal-gradebook.component.html',
  styleUrls: ['./personal-gradebook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalGradebookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
