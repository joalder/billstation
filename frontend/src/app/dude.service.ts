import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DudeService {

  private dudesUrl = 'api/dudes/';

  constructor( private http: HttpClient,) { }

  getDudes (): Observable<Dude[]> {
    return this.http.get<Dude[]>(this.dudesUrl);
  }
}

export class Dude {
  public id: number;
  public url: URL;
  public name: String;
  public created: String;
}
