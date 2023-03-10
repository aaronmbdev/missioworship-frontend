import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOneTapService } from 'ng-google-one-tap';
import { TokenResponse } from '../_auth/auth-dtos';
import { AuthService } from '../_auth/auth.service';
import { ngbAlert, ngbAlerts } from '../_common/prefab/ngbAlert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logged: TokenResponse|null = null;
  errorNotify = new ngbAlerts({
    type:'danger',
    selfClose:true
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private onetap: NgOneTapService
    ) { }

  ngOnInit(): void {}

  test(){
    this.errorNotify.send('TEST');
    console.log(this.errorNotify.alerts);
  }

  logIn() {
    this.onetap.tapInitialize();
    this.onetap.promtMoment.subscribe(res => {
       res.getDismissedReason();
       res.getMomentType();
       res.getNotDisplayedReason();
       res.getSkippedReason();
       res.isDismissedMoment();
       res.isDisplayed();
       res.isNotDisplayed();
       res.isSkippedMoment();
    });
    this.onetap.oneTapCredentialResponse.subscribe(
      {
        next: data => {
          this.serverLogin(data.credential);
        }, error: err => {
          this.errorNotify.send('Fallo al conectar con Google')
          console.log(err);
        }
      }
    );
  }

  private serverLogin(token:string){
    this.auth.sendToken(token).subscribe({
      next: data => {
        this.router.navigate(['/']);
        this.auth.saveToken(data);
      }, error: (err:HttpErrorResponse) => {
        if(err.status == 0){
          this.errorNotify.send('Fallo al conectar con el servidor');
          return;
        }
        let error = JSON.parse(err.error);
        this.errorNotify.send(error.problems[0]);
      }
    });
  }

}
