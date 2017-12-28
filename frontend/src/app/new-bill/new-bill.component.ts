import {Component, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude.service";
import {Bill, BillService} from "../bill.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {
  dudes: Dude[];
  inputBill: Bill;

  constructor(private dudeService: DudeService,
              private billService: BillService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getDudes();
    this.loadEmptyBill();
  }

  getDudes(): void {
    this.dudeService.getDudes()
      .subscribe(dudes => this.dudes = dudes);
  }

  loadEmptyBill(): void {
    this.inputBill = new Bill();
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
