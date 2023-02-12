import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppInitComponent } from './app-init/app-init.component';
import { MenuComponent } from './menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { NgGoogleOneTapModule } from 'ng-google-one-tap';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { AttendsComponent } from './attends/attends.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap/alert/alert.module';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './admin/users/users.component';
import { UserRolesComponent } from './admin/users/user-roles/user-roles.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppInitComponent,
    MenuComponent,
    AttendsComponent,
    UsersComponent,
    UserRolesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
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
    }),
    NgbModule
  ],
  providers: [
    HttpClient,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
