import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {LocalStorage} from "@ngx-pwa/local-storage";
import {map, switchMap} from "rxjs/operators";

@Injectable()
export class DudeService {

  private dudesUrl = 'api/dudes/';

  private dudeSelectionSource = new Subject<Dude>();

  constructor(private http: HttpClient, private localStorage: LocalStorage) {
    this.dudeSelectionAnnounced$
      .pipe(switchMap((dude) => this.saveDude(dude)))
      .subscribe()
  }

  getDudes(): Observable<Dude[]> {
    return this.http.get<Dude[]>(this.dudesUrl);
  }

  dudeSelectionAnnounced$ = this.dudeSelectionSource.asObservable();

  selectDude(selectedDude: Dude) {
    this.dudeSelectionSource.next(selectedDude)
  }

  initSelectedDude(): void {
    this.loadDude()
      .pipe(map(dude => this.selectDude(dude)))
      .subscribe()
  }

  saveDude(dude: Dude): Observable<boolean> {
    return this.localStorage.setItem('lastSelectedDude', dude)
  }

  loadDude(): Observable<Dude> {
    return this.localStorage.getItem<Dude>('lastSelectedDude')
  }
}

export class Dude {
  public id: number;
  public url: URL;
  public name: String;
  public created: String;
}
