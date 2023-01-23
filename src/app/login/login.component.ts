import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgOneTapService } from 'ng-google-one-tap';
import { AuthService } from '../_auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private onetap: NgOneTapService
  ) { }

  ngOnInit(): void {
  }

  logIn(sn:'google'){
    switch(sn){
      case 'google':this.loginGoogle();break;
    }
  }
  private loginGoogle(){
    this.onetap.tapInitialize(); //Initialize OneTap, At intial time you can pass config  like this.onetap.tapInitialize(conif) here config is optional.
    this.onetap.promtMoment.subscribe(res => {  // Subscribe the Tap Moment. following response options all have self explanatory. If you want more info pls refer official document below attached link.
       res.getDismissedReason(); 
       res.getMomentType();
       res.getNotDisplayedReason();
       res.getSkippedReason();
       res.isDismissedMoment();
       res.isDisplayed();
       res.isNotDisplayed();
       res.isSkippedMoment();
    });
    this.onetap.oneTapCredentialResponse.subscribe(res => { // After continue with one tap JWT credentials response.
        console.log(res);
    });
  }

  private serverLogin(token:string){
    this.auth.login(token).subscribe({
      next: data =>{
        this.router.navigate(['/menu']);
      }, error: err =>{
        switch(err.status){
          case 0: this.errorDisplay('Error al conectar con el servidor');break;
          case 400: this.errorDisplay('Error en el servidor. Error 400');break;
          default: this.errorDisplay('Error desconocido. Error '+err.status);break;
        }
      }
    });
  }

  errorDisplay(error:string){
    //TODO
  }
}
