import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../features/auth/login/services/auth.service';
import { User } from '../../../common/Models/User.model';
import { CookieService } from 'ngx-cookie-service';

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
    debugger;
    this.authService.user().subscribe({
      next: (res) => {
        if (res) {
          debugger;
          this.user = res;
          console.log('navbar', res);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });

    this.user = this.authService.getUser();
  }
  onLogout(): void {
    debugger;
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
