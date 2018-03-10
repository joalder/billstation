import {Component, Input, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude/dude.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(private dudeService: DudeService) {
  }

  @Input()
  dudes: Dude[];

  selectedDude: Dude;

  ngOnInit() {
  }

  public dudeSelected(): void {
    this.dudeService.selectDude(this.selectedDude);
  }
}
