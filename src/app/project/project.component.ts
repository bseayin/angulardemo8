import { Component, OnInit } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Project } from '../Model/Project';
import { ProjectService } from './project.service';
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
    this.newproject.pname=this.validateForm.controls['pname'].value;
    this.newproject.psize=this.validateForm.controls['size'].value;
    this.newproject.price=this.validateForm.controls['price'].value;
    this.projectService.addProject(this.newproject).subscribe(
      project => {
      alert('添加成功')}
    );
  }



  constructor(private fb: FormBuilder,private projectService: ProjectService) {
  }

  ngOnInit(): void {
    
    this.validateForm = this.fb.group({
      size  : [ null, [ Validators.required ] ],
      price  : [ null, [ Validators.required ] ],
      pname: [ null, [ Validators.required ] ]
    });
  }

}
