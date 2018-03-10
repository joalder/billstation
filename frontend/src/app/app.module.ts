import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
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
import {DebtOverviewComponent} from './debt-overview/debt-overview.component';
import {RecentActivityComponent} from './recent-activity/recent-activity.component';
import {NewBillComponent} from './new-bill/new-bill.component';
import {NewPaymentComponent} from './new-payment/new-payment.component';
import {DudeService} from "./dude.service";
import {BillService} from "./bill.service";
import {PaymentService} from "./payment.service";

import {MatIconModule, MatIconRegistry, MatNativeDateModule} from '@angular/material';
import {DebtService} from "./debt.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FindDudePipe} from './find-dude.pipe';

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
    DebtOverviewComponent,
    RecentActivityComponent,
    NewBillComponent,
    NewPaymentComponent,
    FindDudePipe,
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
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    //Extended MaterialDesign Icon set, see 'https://materialdesignicons.com/' for icon ref
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./static/assets/mdi.svg'));
  }
}
