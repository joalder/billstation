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

  constructor() {
  }

  ngOnInit() {
  }
}
