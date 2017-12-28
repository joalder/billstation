import {Component, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude.service";
import {Debt, DebtService} from "../debt.service";

@Component({
  selector: 'app-dept-overview',
  templateUrl: './dept-overview.component.html',
  styleUrls: ['./dept-overview.component.css']
})
export class DeptOverviewComponent implements OnInit {
  dudes: Dude[] = [];
  selectedDude: Dude;
  paymentAmount: Map<Dude, number> = new Map<Dude, number>();
  debtByRelation: Map<Dude, Debt[]> = new Map<Dude, Debt[]>();

  constructor(private dudeService: DudeService, private debtService: DebtService) {}

  ngOnInit() {
    this.getDudes();
  }

  getDudes(): void {
    this.dudeService.getDudes()
      .subscribe(dudes => {
        this.dudes = dudes;
        for (let debtor of this.dudes){
          this.updateDebt(debtor);
        }
      });
  }

  private updateDebt(debtor) {
    let debts: Debt[] = [];
    this.debtByRelation.set(debtor, debts);

    this.dudes.filter(dude => dude !== debtor)
      .forEach(owner => {
        this.debtService.getDebt(owner.id, debtor.id)
          .subscribe(debt => debts.push(debt));
      })
  }

  getDudesExceptSelected(): Dude[] {
    return this.dudes.filter(dude => dude !== this.selectedDude)
  }
}
