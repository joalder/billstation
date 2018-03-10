import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DudeService {

  private dudesUrl = 'api/dudes/';

  private dudeSelectionSource = new Subject<Dude>();

  constructor( private http: HttpClient,) { }

  getDudes (): Observable<Dude[]> {
    return this.http.get<Dude[]>(this.dudesUrl);
  }

  dudeSelectionAnnounced$ = this.dudeSelectionSource.asObservable();

  selectDude(selectedDude: Dude) {
    this.dudeSelectionSource.next(selectedDude);
  }
}

export class Dude {
  public id: number;
  public url: URL;
  public name: String;
  public created: String;
}
