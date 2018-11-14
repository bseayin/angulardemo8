import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from '../user';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
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
  loginvalidateForm: FormGroup;
  password:string;
  userName:string;
  classname:string;
  result:any={};
  user:User=new User();
  user2:User=new User();
  submitForm(): void {
    var id=0;
    for (const i in this.loginvalidateForm.controls) {
      this.loginvalidateForm.controls[ i ].markAsDirty();
      this.loginvalidateForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginvalidateForm.valid);
    if(this.loginvalidateForm.valid){
      //执行后台操作
      this.loginservice.loginAction(this.user).subscribe(
        res=>{
          if(res.result=="Y"){
            this.router.navigateByUrl("index1");
          }else{
            alert("登录失败，请检查账号！！！");
          }
          
        }
      );
    }
  }


  submitForm2(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    this.user2.name=this.validateForm.controls.username2.value;
    this.user2.password=this.validateForm.controls.password2.value;
    this.user2.clazzid=this.validateForm.controls.classname2.value;
    console.log("classname----"+this.user2.clazzid);
    this.loginservice.registerAction(this.user2).subscribe(
      res=>{
        this.result=res;
        this.isVisible = false;
        //this.router.navigateByUrl("index1");
      }
    );
  }

  constructor(private fb: FormBuilder,private loginservice:LoginService,private router:Router) {
  }
  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password2.value) {
      return { confirm: true, error: true };
    }
  };
  ngOnInit(): void {
    this.loginvalidateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
     
      email            : [ null, [ Validators.email ] ],
      
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      password2         : [ null, [ Validators.required ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required ] ],
      username2          : [ null, [ Validators.required ] ],
      classname2          : [ null, [ Validators.required ] ],
      agree            : [ false ]
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
