import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_auth/auth.service';
import { ABSOLUTES } from '../_common/constants';

@Component({
  selector: 'app-app-init',
  template: 'Not implemented!'
})
export class AppInitComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    ABSOLUTES.USES_APP = true;
    this.router.navigate(this.auth.isLoggedIn?['/']:['/login']);
  }
}
