import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  constructor(private router: Router, private authService:AuthService) {}
  isLoggedIn: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
  }
  public onLogOut(): void {
    localStorage.removeItem('auth_access');
    this.authService.changeLoggedState(false);
    this.router.navigateByUrl('/login');
    
  }
}
