import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductsTableComponent } from './cart-products-table.component';

describe('CartProductsTableComponent', () => {
  let component: CartProductsTableComponent;
  let fixture: ComponentFixture<CartProductsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartProductsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
