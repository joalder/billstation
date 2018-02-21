import {BrowserModule} from '@angular/platform-browser';
import {NgModule,} from '@angular/core';
import {HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import {AppComponent} from './app.component';
import {DeptOverviewComponent} from './dept-overview/dept-overview.component';
import {RecentActivityComponent} from './recent-activity/recent-activity.component';
import {NewBillComponent} from './new-bill/new-bill.component';
import {NewPaymentComponent} from './new-payment/new-payment.component';
import {DudeService} from "./dude.service";
import {BillService} from "./bill.service";
import {PaymentService} from "./payment.service";

import {MatNativeDateModule} from '@angular/material';
import {DebtService} from "./debt.service";

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DATE_FORMAT = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    DeptOverviewComponent,
    RecentActivityComponent,
    NewBillComponent,
    NewPaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken',
    }),
  ],
  providers: [
    DudeService, BillService, PaymentService, DebtService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT},
    {provide: MAT_DATE_LOCALE, useValue: 'en-US'},
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule {
}
