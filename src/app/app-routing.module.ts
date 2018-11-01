import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component'
import { PanelComponent } from './components/panel/panel.component'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'panel', component: PanelComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
