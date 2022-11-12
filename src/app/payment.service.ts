import { Injectable } from '@angular/core';
import { moneyUser } from './moneyuser';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor() { }

  public user: moneyUser | undefined;


  addUser(user: moneyUser): void {
    this.user = user;
  }

  get theUser(){
    return this.user
  }
}
