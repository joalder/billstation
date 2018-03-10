import {Component, Input, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude/dude.service";
import {Debt, DebtService} from "../debt.service";
import {PaymentService} from "../payments/payment.service";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-debt-overview',
  templateUrl: './debt-overview.component.html',
  styleUrls: ['./debt-overview.component.css']
})
export class DebtOverviewComponent implements OnInit {
  @Input()
  dudes: Dude[] = [];
  viewPoint: Dude;
  debtList: Debt[] = [];

  dudeSubscription: Subscription;
  paymentSubscription: Subscription;

  constructor(private dudeService: DudeService, private paymentService: PaymentService, private debtService: DebtService) {
  }

  ngOnInit() {
    this.dudeSubscription = this.dudeService.dudeSelectionAnnounced$
      .subscribe(dude => {
        this.viewPoint = dude;
        this.updateDebtOverview();
      });

    this.paymentSubscription = this.paymentService.newPaymentAnnounced$
      .subscribe(() => {
        this.updateDebtOverview();
      });
  }

  ngOnDestroy() {
    this.dudeSubscription.unsubscribe();
    this.paymentSubscription.unsubscribe();
  }

  getDudesExceptSelected(): Dude[] {
    return this.dudes.filter(dude => dude !== this.viewPoint);
  }

  updateDebtOverview(): void {
    this.debtList = [];

    for (let dude of this.getDudesExceptSelected()) {
      this.debtService.getDebt(dude.id, this.viewPoint.id,)
        .subscribe(debt => {
          this.debtList.push(debt)
        });
    }
  }
}
