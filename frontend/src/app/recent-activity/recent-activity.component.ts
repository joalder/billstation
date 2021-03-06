import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bill, BillService} from "../bill.service";
import {Payment, PaymentService} from "../payments/payment.service";
import {Dude} from "../dude/dude.service";

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {

  @Input()
  public dudes: Dude[] = [];
  public bills: Bill[] = [];
  public payments: Payment[] = [];
  public loadingBills: boolean = true;
  public loadingPayments: boolean = true;

  constructor(private http: HttpClient, private paymentService: PaymentService, private billService: BillService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.billService.getBills()
      .subscribe(bills => {
        this.bills = bills;
        this.loadingBills = false;
      });

    this.paymentService.getPayments()
      .subscribe(payments => {
        this.payments = payments;
        this.loadingPayments = false;
      });

  }
}
