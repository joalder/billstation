import {BrowserModule} from '@angular/platform-browser';
import {NgModule,} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import {AppComponent} from './app.component';
import { DeptOverviewComponent } from './dept-overview/dept-overview.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    DeptOverviewComponent,
    RecentActivityComponent,
    NewBillComponent,
    NewPaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {
}
