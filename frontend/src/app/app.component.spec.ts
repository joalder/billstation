import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockRecentActivity,
        MockdebtOverview,
        MockNewBill,
        MockNewPayment,
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});


@Component({
  selector: 'app-recent-activity',
  template: ''
})
class MockRecentActivity {
}

@Component({
  selector: 'app-new-bill',
  template: ''
})
class MockNewBill {
}

@Component({
  selector: 'app-new-payment',
  template: ''
})
class MockNewPayment {
}

@Component({
  selector: 'app-debt-overview',
  template: ''
})
class MockdebtOverview {
}
