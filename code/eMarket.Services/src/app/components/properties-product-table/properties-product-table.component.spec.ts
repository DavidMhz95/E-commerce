import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesProductTableComponent } from './properties-product-table.component';

describe('PropertiesProductTableComponent', () => {
  let component: PropertiesProductTableComponent;
  let fixture: ComponentFixture<PropertiesProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertiesProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
