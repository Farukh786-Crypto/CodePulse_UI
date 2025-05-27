import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../common/Models/login-request.model';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToStrService } from '../../category/Services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  model!: LoginRequest;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private tostr: ToStrService,
    private router: Router,
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    debugger;
    console.log(this.model);
    this.authService.login(this.model).subscribe({
      next: (res) => {
        if (res) {
          debugger;
          // set Auth cookies
          console.log(res);
          this.cookieService.set(
            'Authorization',
            `Bearer ${res.token}`,
            undefined,
            '/',
            undefined,
            true,
            'Strict',
          );
          debugger;
          // Set User
          this.authService.setUser({
            email: res.email,
            roles: res.roles,
          });
          this.tostr.showSuccess('Login Succesfully !!!', 'Sucess');
        }
      },
      error: (err) => {
        console.error(err);
        this.tostr.showError(err, 'Error');
      },
      complete: () => {
        // Redirect back to Home Page and reload the full page
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      },
    });
  }
}
