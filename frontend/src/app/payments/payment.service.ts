import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Dude} from "../dude/dude.service";

@Injectable()
export class PaymentService {
  private paymentUrl: string = "api/payments/";

  constructor(private http: HttpClient) {
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentUrl);
  }

  savePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentUrl, payment);
  }

  savePaymentByAmount(sender: Dude, receiver: Dude, amount: number): Observable<PaymentByAmountResponse> {
    let url: string = this.paymentUrl + sender.id + '/' + receiver.id + '/';

    return this.http.post<PaymentByAmountResponse>(url, amount);
  }
}

export class Payment {
  constructor(at: Date, bill: string, amount: number, by: Dude, forOwnBill: Boolean) {
    this.at = at;
    this.bill = bill;
    this.amount = amount;
    this.by = by;
    this.for_own_bill = forOwnBill;
  }

  at: Date;
  bill: string;
  amount: number;
  by: Dude;
  for_own_bill: Boolean;
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
