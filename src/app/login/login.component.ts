import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../user';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  password:string;
  userName:string;
  result:any={};
  user:User={id:0,name:"",password:""};
  submitForm(): void {
    var id=0;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    console.log("hasError----"+this.validateForm.valid);
    console.log("password----"+this.password);
    console.log("userName----"+this.userName);
    if(this.validateForm.valid){
      //执行后台操作
      this.loginservice.loginAction(this.user).subscribe(
        res=>{
          this.result=res;
          this.router.navigateByUrl("index1");
        }
      );
    }
  }

  constructor(private fb: FormBuilder,private loginservice:LoginService,private router:Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

//登录注册模态框
  isVisible = false;
  isOkLoading = false;
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isOkLoading = true;
    window.setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
