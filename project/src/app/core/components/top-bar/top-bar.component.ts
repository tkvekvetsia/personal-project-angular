import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  constructor(private router: Router, private authService:AuthService, private backendService: BackendService) {}
  isLoggedIn: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }
  public onLogOut(): void {
   this.authService.logOut();
  }
}
