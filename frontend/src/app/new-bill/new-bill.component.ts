import {Component, OnInit, Input} from '@angular/core';
import {Dude, DudeService} from "../dude/dude.service";
import {Bill, BillService} from "../bill.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css']
})
export class NewBillComponent implements OnInit {
  @Input()
  dudes: Dude[];
  inputBill: Bill;

  constructor(private billService: BillService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.loadEmptyBill();
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
