import { Component, OnInit, OnDestroy } from '@angular/core';
import { moneyUser } from '../moneyuser';
import { PaymentService } from '../payment.service';
import { Observable, interval, Subscription } from 'rxjs';
import { paymentType } from '../paymentType';
import { dayMapping } from '../days';

@Component({
  selector: 'app-make-money',
  templateUrl: './make-money.component.html',
  styleUrls: ['./make-money.component.scss']
})
export class MakeMoneyComponent implements OnInit, OnDestroy {
  public user: moneyUser | undefined;
  public moneyPayment = 0
  payment = 0
  tick = interval(1000)
  subscription: Subscription | undefined
  constructor(private paymentUser: PaymentService) {
  }

  ngOnInit(): void {
    this.user = this.paymentUser.theUser
    this.setMoneyInteval()
  }

  setMoneyInteval(): void {
    const payment = this.getPayment()
    this.addPay()
    this.subscription = this.tick.subscribe(() => {
      if(this.gettingPaid()){
        this.moneyPayment += payment
      }
    })
  }

  addPay(): void {
    if(this.user?.money){
      this.moneyPayment = this.user?.money
    }
    else {
      this.moneyPayment = 0
    }
  }

  getPayment(): number {
    if(this.user?.paymentType === paymentType.hourly){
      return (this.user?.pay / 3600)
    }
    else if(this.user?.paymentType === paymentType.salery){
      return (this.user?.pay / (3600 * 8 * 365))
    }
    else {
      return 0
    }
  }

  // Get the date and figure out if you need to update
  gettingPaid(): boolean {
    const weekdayMapping = this.user?.workdays.map(weekday => {
      return dayMapping[weekday]
    })
    
    const now = new Date();
    if(weekdayMapping?.includes(now.getUTCDay())){
      return true
    }
    else{
      return false
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
