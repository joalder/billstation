import {Component, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude.service";
import {Debt, DebtService} from "../debt.service";
import {Payment, PaymentService} from "../payment.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-debt-overview',
  templateUrl: './debt-overview.component.html',
  styleUrls: ['./debt-overview.component.css']
})
export class DebtOverviewComponent implements OnInit {
  dudes: Dude[] = [];
  viewPoint: Dude;
  debtList: Debt[] = [];

  constructor(private dudeService: DudeService, private debtService: DebtService) {
  }

  ngOnInit() {
    this.loadDudes();
  }

  loadDudes(): void {
    this.dudeService.getDudes()
      .subscribe(dudes => {
        this.dudes = dudes;
      });
  }

  getDudesExceptSelected(): Dude[] {
    return this.dudes.filter(dude => dude !== this.viewPoint);
  }

  viewPointChanged(): void {
    this.debtList = [];

    for (let dude of this.getDudesExceptSelected()) {
      this.debtService.getDebt(dude.id, this.viewPoint.id,)
        .subscribe(debt => {
          this.debtList.push(debt)
        });
    }
  }
}
