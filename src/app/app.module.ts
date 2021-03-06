import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here
import { HttpClientModule }    from '@angular/common/http';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { ConfigComponent } from './config/config.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialdemoComponent } from './materialdemo/materialdemo.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './login/login.component';
import { Index1Component } from './index1/index1.component';
import { TaskComponent } from './task/task.component';
import { DocumentComponent } from './document/document.component';
import { BasicdemoComponent } from './basicdemo/basicdemo.component';
import { Basicdemo2Component } from './basicdemo2/basicdemo2.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './parent/child/child.component';
import { TalkComponent } from './talk/talk.component';
import { SetComponent } from './set/set.component';
import { HallComponent } from './hall/hall.component';
import { UserComponent } from './user/user.component';
import {SharedService} from './shared.service';
import { FunctionsComponent } from './functions/functions.component';
import { SightComponent } from './sight/sight.component';
import { MemberComponent } from './member/member.component';
import { ProjectComponent } from './project/project.component';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketComponent } from './web-socket/web-socket.component'; 
import { WebSocketService } from './shared/web-socket.service'; 
import { CheckComponent } from './check/check.component'; 
import { LocalStorage } from './hall/local.storage';
import { EditorComponent } from './editor/editor.component';

import { MailComponent } from './mail/mail.component';
registerLocaleData(zh);
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    ConfigComponent,
    MaterialdemoComponent,
    LoginComponent,
    Index1Component,
    TaskComponent,
    DocumentComponent,
    BasicdemoComponent,
  
    Basicdemo2Component,
  
    ParentComponent,
  
    ChildComponent,
  
    TalkComponent,
  
    SetComponent,
  
    HallComponent,
  
    UserComponent,
  
    FunctionsComponent,
  
    SightComponent,
  
    MemberComponent,
  
    ProjectComponent,
  
    WebSocketComponent,
    CheckComponent,
    EditorComponent,
    MailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    NgZorroAntdModule,
  ],

  providers: [{ provide: NZ_I18N, useValue: zh_CN },SharedService,CookieService,WebSocketService,LocalStorage ],
  bootstrap: [AppComponent]
})

export class AppModule { }
