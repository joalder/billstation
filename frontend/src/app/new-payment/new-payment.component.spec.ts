import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MatCardModule} from '@angular/material/card';

import { NewPaymentComponent } from './new-payment.component';

describe('NewPaymentComponent', () => {
  let component: NewPaymentComponent;
  let fixture: ComponentFixture<NewPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPaymentComponent ],
      imports: [
        MatCardModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
