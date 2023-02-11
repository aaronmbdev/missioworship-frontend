import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOneTapService } from 'ng-google-one-tap';
import { TokenResponse } from '../_auth/auth-dtos';
import { AuthService } from '../_auth/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logged: TokenResponse|null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private onetap: NgOneTapService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {}

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
      }, error: err => {
        let error = JSON.parse(err.error);
        this.toastr.error(error["problems"][0]);
      }
    });
  }

}
