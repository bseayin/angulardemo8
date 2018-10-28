import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { MaterialdemoComponent }  from './materialdemo/materialdemo.component';
import { LoginComponent }  from './login/login.component';
import { Index1Component }  from './index1/index1.component';

const routes: Routes = [
  { path: '', redirectTo: '/index1', pathMatch: 'full' },
  { path: 'index1', component: Index1Component },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'material', component: MaterialdemoComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
