import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

  @ViewChild('dudeSelect') dudeSelect;

  selectedDude: Dude;

  ngOnInit() {
    this.dudeService.dudeSelectionAnnounced$
      .subscribe(selectedDude => {
        this.selectedDude = this.dudes.find((dude) => dude.id === selectedDude.id)
      })
  }

  public dudeSelected(): void {
    this.dudeService.selectDude(this.selectedDude);
  }
}
