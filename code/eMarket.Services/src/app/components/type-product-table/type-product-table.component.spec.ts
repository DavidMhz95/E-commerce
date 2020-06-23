import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProductTableComponent } from './type-product-table.component';

describe('TypeProductTableComponent', () => {
  let component: TypeProductTableComponent;
  let fixture: ComponentFixture<TypeProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
