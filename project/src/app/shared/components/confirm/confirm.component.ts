import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent implements OnInit {
  confirmValue$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  constructor(private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.confirmValue$ = this.confirmService.getCofnirmValue();
  }

  public onYes(): void{
    this.confirmService.changeConfirmValue(true);
  }

  public onNo(): void{
    this.confirmService.changeConfirmValue(false);
  }

}
