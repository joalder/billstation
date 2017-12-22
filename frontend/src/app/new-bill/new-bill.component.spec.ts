import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MatCardModule} from '@angular/material/card';

import { NewBillComponent } from './new-bill.component';

describe('NewBillComponent', () => {
  let component: NewBillComponent;
  let fixture: ComponentFixture<NewBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBillComponent ],
      imports: [
        MatCardModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
