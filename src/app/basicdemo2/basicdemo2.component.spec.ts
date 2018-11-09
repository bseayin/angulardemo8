import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Basicdemo2Component } from './basicdemo2.component';

describe('Basicdemo2Component', () => {
  let component: Basicdemo2Component;
  let fixture: ComponentFixture<Basicdemo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Basicdemo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Basicdemo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
