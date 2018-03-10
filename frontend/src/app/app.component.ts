import { Component } from '@angular/core';
import { NewBillComponent } from "./new-bill/new-bill.component";
import {Dude, DudeService} from "./dude.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  dudes: Dude[] = [];

  constructor (private dudeService: DudeService){}

  ngOnInit() {
    this.loadDudes();
  }

  loadDudes(): void {
    this.dudeService.getDudes()
      .subscribe(dudes => {
        this.dudes = dudes;
      });
  }

}
