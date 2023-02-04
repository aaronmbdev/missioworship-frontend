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
    this.onetap.oneTapCredentialResponse.subscribe(res => { 
        //Llamar al backend para recibir token y almacenarlo en local Storage
        console.log(res.credential);
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
    console.log(error);
  }
}
