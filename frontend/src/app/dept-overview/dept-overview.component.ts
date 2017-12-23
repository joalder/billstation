import { Component, OnInit } from '@angular/core';
import {Dude, DudeService} from "../dude.service";

@Component({
  selector: 'app-dept-overview',
  templateUrl: './dept-overview.component.html',
  styleUrls: ['./dept-overview.component.css']
})
export class DeptOverviewComponent implements OnInit {
  dudes: Dude[];

  constructor(private dudeService: DudeService) { }

  ngOnInit() {
    this.getDudes();
  }

  getDudes(): void {
    this.dudeService.getDudes()
      .subscribe(dudes => this.dudes = dudes);
  }
}
