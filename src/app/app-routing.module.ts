import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { MaterialdemoComponent }  from './materialdemo/materialdemo.component';
import { LoginComponent }  from './login/login.component';
import { Index1Component }  from './index1/index1.component';
import { TaskComponent }  from './task/task.component';
import { DocumentComponent }  from './document/document.component';
import { BasicdemoComponent }  from './basicdemo/basicdemo.component';
import { LogComponent }  from './log/log.component';
import { TalkComponent }  from './talk/talk.component';
import { SetComponent }  from './set/set.component';
import { HallComponent }  from './hall/hall.component';
import { UserComponent }  from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'index1', component: Index1Component,
    children:[
      { path: '', component: HallComponent },
      { path: 'hall', component: HallComponent },
      { path: 'task', component: TaskComponent },
      { path: 'talk', component: TalkComponent },
      { path: 'log', component: LogComponent },
      { path: 'set', component: SetComponent },
      { path: 'user', component: UserComponent },
      { path: 'document', component: DocumentComponent }
    ]
},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'basicdemo', component: BasicdemoComponent },
  { path: 'material', component: MaterialdemoComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
