import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from './shared/animations/routing-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // title = 'project';
  public getRouteAnimation(outlet: RouterOutlet) {
    const res =
      outlet.activatedRouteData['num'] === undefined
        ? -1
        : outlet.activatedRouteData['num'];

    return res;
  }
}
