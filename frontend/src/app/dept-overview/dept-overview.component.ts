import {Component, OnInit} from '@angular/core';
import {Dude, DudeService} from "../dude.service";
import {Debt, DebtService} from "../debt.service";
import {Payment, PaymentService} from "../payment.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dept-overview',
  templateUrl: './dept-overview.component.html',
  styleUrls: ['./dept-overview.component.css']
})
export class DeptOverviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
