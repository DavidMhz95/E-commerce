import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSectionsComponent } from './header-sections.component';

describe('HeaderSectionsComponent', () => {
  let component: HeaderSectionsComponent;
  let fixture: ComponentFixture<HeaderSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
