import {Pipe, PipeTransform} from '@angular/core';
import {Payment} from "./payment.service";

@Pipe({
  name: 'removePaymentsForOwnBill'
})
export class RemovePaymentsForOwnBillPipe implements PipeTransform {

  transform(value: Payment[], args?: any): any {
    return value.filter(payment => !payment.for_own_bill);
  }
}
