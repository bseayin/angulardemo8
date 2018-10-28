import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialdemoComponent } from './materialdemo.component';

describe('MaterialdemoComponent', () => {
  let component: MaterialdemoComponent;
  let fixture: ComponentFixture<MaterialdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
