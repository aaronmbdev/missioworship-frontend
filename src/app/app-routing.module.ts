import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInitComponent } from './app-init/app-init.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: '',component: MenuComponent},
  { path: 'login',component: LoginComponent},
  { path: 'Jonh317',component: AppInitComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
