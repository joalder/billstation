import {Component, OnInit} from '@angular/core';
import {PaymentService} from "../payment.service";
import {Dude, DudeService} from "../dude.service";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrls: ['./new-payment.component.css']
})
export class NewPaymentComponent implements OnInit {
  dudes: Dude[] = [];
  sender: Dude;
  receiver: Dude;
  paymentAmount: number = 0;

  dudeAutoComplete: FormControl = new FormControl();

  loaded: Boolean = false;

  constructor(private dudeService: DudeService, private paymentService: PaymentService) {
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
    return this.dudes.filter(dude => dude !== this.sender);
  }

  renderDude(dude: Dude): String {
    return dude.name;
  }

  submitPayment(): void {
    this.paymentService.savePaymentByAmount(this.sender, this.receiver, this.paymentAmount).subscribe(
      (response) => console.log(response)
    );
  }
}
