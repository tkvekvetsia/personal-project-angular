import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-gradebook',
  templateUrl: './add-gradebook.component.html',
  styleUrls: ['./add-gradebook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGradebookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onCancel(): void{
    
  }
}
