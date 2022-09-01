import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
    // localStorage.removeItem('auth_access');
    this.backendService.changeLoggedUserEmail('');
    this.backendService.changeUpdateUserId(-1);
    this.authService.changeLoggedState(false);
    this.backendService.changeUpdateState(false);
    this.router.navigateByUrl('/login');
    
  }
}
