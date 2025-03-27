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
import { provideHttpClient } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.development';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('category', CodePulseReducer),
    EffectsModule.forFeature([CategoryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: 'CODEBASEURL', useValue: environment.apiBaseUrl },
    provideClientHydration(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
