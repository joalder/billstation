import {Component, OnInit} from '@angular/core';
import {Dude, DudeService} from "./dude/dude.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  dudes: Dude[] = [];

  constructor (private dudeService: DudeService){}

  ngOnInit() {
    this.loadDudes();
  }

  loadDudes(): void {
    this.dudeService.getDudes()
      .pipe(tap(() => this.dudeService.initSelectedDude()))
      .subscribe(dudes => {
        this.dudes = dudes;
        this.dudeService.initSelectedDude();
      });
  }

}
