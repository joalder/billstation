import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MatCardModule} from '@angular/material/card';

import { DeptOverviewComponent } from './dept-overview.component';

describe('DeptOverviewComponent', () => {
  let component: DeptOverviewComponent;
  let fixture: ComponentFixture<DeptOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptOverviewComponent ],
      imports: [
        MatCardModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
