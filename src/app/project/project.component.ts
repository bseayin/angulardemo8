import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Project } from '../Model/Project';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  validateForm: FormGroup;
  newproject:Project=new Project();

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
      
    }
  }

  genderChange(value: string): void {
    this.validateForm.get('size').setValue(value === '大' ?'项目规模, 大!' : value === '中' ?'项目规模, 中!' :'项目规模, 小!');
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      size  : [ null, [ Validators.required ] ],
      price  : [ null, [ Validators.required ] ],
      pname: [ null, [ Validators.required ] ]
    });
  }

}
