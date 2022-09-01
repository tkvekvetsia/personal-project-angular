import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
