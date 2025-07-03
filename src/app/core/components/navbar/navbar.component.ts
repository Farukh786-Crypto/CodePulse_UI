import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/login/services/auth.service';
import { User } from '../../../common/Models/User.model';
import { CookieService } from 'ngx-cookie-service';
import { ApplicationRoute } from '../../../app-routing.module';

@Component({
  selector: 'app-navbar',
  standalone: false,
  providers: [AuthService, CookieService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user?: User;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (res) => {
        if (res) {
          this.user = res;
          console.log('navbar', res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.user = this.authService.getUser();
  }
  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl(ApplicationRoute.Login).then(() => {
      window.location.reload();
    });
  }
}
