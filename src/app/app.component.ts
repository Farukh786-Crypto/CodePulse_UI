import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ApplicationRoute, RouteTo } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'codepulse';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = new Date();
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
  ) {
    // sets an idle timeout of 15 min, for testing purposes.
    idle.setIdle(900);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.clear(); // or clear your auth tokens
      this.router.navigate([RouteTo(ApplicationRoute.Login)]);
    });
    idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));
    idle.onTimeoutWarning.subscribe(
      (countdown) =>
        (this.idleState = 'You will time out in ' + countdown + ' seconds!'),
    );

    // sets the ping interval to 60 seconds
    keepalive.interval(60);

    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
