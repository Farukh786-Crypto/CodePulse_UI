import { isDevMode, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { StoreModule } from '@ngrx/store';
import { CodePulseReducer } from './store/category.reducer';
import { CategoryEffects } from './store/category.effect';
import { EffectsModule } from '@ngrx/effects';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';
import { MarkdownModule } from 'ngx-markdown';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'ngx-moment';
import { AuthService } from './features/auth/login/services/auth.service';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-top-right',
    }),
    AppRoutingModule,
    NgxUiLoaderModule,
    NgIdleKeepaliveModule.forRoot(),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true }),
    MarkdownModule.forRoot(),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('category', CodePulseReducer),
    EffectsModule.forFeature([CategoryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    HttpClientModule,
  ],
  providers: [
    { provide: 'CODEBASEURL', useValue: environment.apiBaseUrl },
    provideClientHydration(),
    provideHttpClient(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
