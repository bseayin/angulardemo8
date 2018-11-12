import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlightComponent } from './slight.component';

describe('SlightComponent', () => {
  let component: SlightComponent;
  let fixture: ComponentFixture<SlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
