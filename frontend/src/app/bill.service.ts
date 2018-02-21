import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BillService {
  private billUrl: string = "api/bills/";

  constructor(private http: HttpClient) {
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.billUrl);
  }

  saveBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.billUrl, bill);
  }
}

export class Bill {
  description: string;
  date: string;
  amount: number;
  owner: string;
  affected_dudes: string[];
}
