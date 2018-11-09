import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicdemoComponent } from './basicdemo.component';

describe('BasicdemoComponent', () => {
  let component: BasicdemoComponent;
  let fixture: ComponentFixture<BasicdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
