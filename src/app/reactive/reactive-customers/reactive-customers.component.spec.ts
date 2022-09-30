import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveCustomersComponent } from './reactive-customers.component';

describe('ReactiveCustomersComponent', () => {
  let component: ReactiveCustomersComponent;
  let fixture: ComponentFixture<ReactiveCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
