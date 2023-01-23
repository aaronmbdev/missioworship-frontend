import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppInitComponent } from './app-init/app-init.component';
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NgGoogleOneTapModule } from 'ng-google-one-tap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppInitComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgGoogleOneTapModule.config({  //Look options table for some more avaialbe options and config here.
          client_id: environment.googleClientId,
          cancel_on_tap_outside: false,
          authvalidate_by_googleapis: false,
          auto_select: false,
          disable_exponential_cooldowntime: false,
          context: 'signup'
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
