import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnwikiComponent } from './ownwiki.component';

describe('OwnwikiComponent', () => {
  let component: OwnwikiComponent;
  let fixture: ComponentFixture<OwnwikiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnwikiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnwikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
