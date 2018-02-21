import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Dude} from "./dude.service";

@Injectable()
export class PaymentService {
  private billUrl: string = "api/payments/";

  constructor(private http: HttpClient) {
  }

  savePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.billUrl, payment);
  }

  savePaymentByAmount(sender: Dude, receiver: Dude, amount: number): Observable<PaymentByAmountResponse> {
    let url: string = this.billUrl + sender.id + '/' + receiver.id + '/';

    return this.http.post<PaymentByAmountResponse>(url, amount);
  }
}

export class Payment {
  constructor(at: Date, bill: string, amount: number, by: Dude) {
    this.at = at;
    this.bill = bill;
    this.amount = amount;
    this.by = by;
  }

  at: Date;
  bill: string;
  amount: number;
  by: Dude
}

class PaymentByAmountResponse {
  constructor(by: Dude, receiver: Dude, amount: number, paymentsMade: Payment[]) {
    this.by = by;
    this.receiver = receiver;
    this.amount = amount;
    this.paidBills = paymentsMade;
  }

  by: Dude;
  receiver: Dude;
  amount: number;
  paidBills: Payment[];
}
