import {BrowserModule} from '@angular/platform-browser';
import {NgModule,} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';

import {AppComponent} from './app.component';
import {DeptOverviewComponent} from './dept-overview/dept-overview.component';
import {RecentActivityComponent} from './recent-activity/recent-activity.component';
import {NewBillComponent} from './new-bill/new-bill.component';
import {NewPaymentComponent} from './new-payment/new-payment.component';
import {DudeService} from "./dude.service";


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
    HttpClientModule,
  ],
  providers: [DudeService],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {
}
