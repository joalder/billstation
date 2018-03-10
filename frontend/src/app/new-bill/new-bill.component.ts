import {Component, Input, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude/dude.service";
import {Bill, BillService} from "../bill.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {
  @Input()
  dudes: Dude[];
  inputBill: Bill;
  selectedDude: Dude;

  private dudeSelectionSubscription: Subscription;

  constructor(private billService: BillService,
              private dudeService: DudeService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadEmptyBill();

    this.dudeSelectionSubscription = this.dudeService.dudeSelectionAnnounced$
      .subscribe(dude => {
        this.selectedDude = dude;
        this.inputBill.owner = dude.url.toString();
      });
  }

  ngOnDestroy() {
    this.dudeSelectionSubscription.unsubscribe();
  }

  loadEmptyBill(): void {
    this.inputBill = new Bill();
    this.inputBill.owner = this.selectedDude ? this.selectedDude.url.toString() : '';
    this.inputBill.date = moment().format('YYYY-MM-DD');
  }

  saveBill(): void {
    // Nasty way of forcing it to be date only,
    this.inputBill.date = moment(this.inputBill.date).format('YYYY-MM-DD');

    this.billService.saveBill(this.inputBill).subscribe(bill => {
      this.snackBar.open(
        "Bill " + this.inputBill.description + " for " + this.inputBill.amount + " CHF has been added",
        'Dismiss',
        {duration: 1500});
      this.loadEmptyBill();
    });
  }
}
