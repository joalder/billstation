import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Dude} from "./dude/dude.service";
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BillService {
  private billUrl: string = "api/bills/";
  private billSelectionSource = new Subject<Bill>();

  constructor(private http: HttpClient) {
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billUrl);
  }

  saveBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billUrl, bill);
  }

  billSelectionAnnounced$ = this.billSelectionSource.asObservable();

  newBill(newBill: Bill) {
    this.billSelectionSource.next(newBill);
  }
}

export class Bill {
  description: string;
  date: string;
  amount: number;
  owner: string;
  affected_dudes: string[];
}
