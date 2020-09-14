import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOrderComponent } from './header-order.component';

describe('HeaderOrderComponent', () => {
  let component: HeaderOrderComponent;
  let fixture: ComponentFixture<HeaderOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
