import { trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FadeAnimation } from 'src/app/shared/animations/animations';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  animations:[FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  showFiller =false
  constructor(
    private router: Router,
    private authService: AuthService,
    private backendService: BackendService
  ) {}
  showMenu = false;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  menu = 'list'
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.getIsLoggedIn();
    this.isAdmin$ = this.authService.getIsAdmin();
  }
  public onLogOut(): void {
    this.authService.logOut();
  }
  public onShowMenu():void{
    this.showMenu = !this.showMenu
    this.menu = this.showMenu ? 'close' : 'list' 
  }
  
}
