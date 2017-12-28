import { Injectable } from '@angular/core';
import {Dude} from "./dude.service";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DebtService {
  private debtUrl = 'api/debt/';

  constructor( private http: HttpClient,) { }

  getDebt(ownerId: number, debtorId: number): Observable<Debt> {
    let url: string = this.debtUrl + ownerId + '/' + debtorId + '/';

    return this.http.get<Debt>(url);
  }
}

export class Debt {
  public owner: Dude;
  public debtor: Dude;
  public amount: number;
  public relation: String;
}
