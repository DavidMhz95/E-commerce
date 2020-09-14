import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfProductComponent } from './type-of-product.component';

describe('TypeOfProductComponent', () => {
  let component: TypeOfProductComponent;
  let fixture: ComponentFixture<TypeOfProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
