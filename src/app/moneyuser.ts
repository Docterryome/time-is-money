import { paymentType } from "./paymentType";
import { days } from "./days";

export interface moneyUser {
    username?: string,
    money: number,
    pay: number,
    paymentType: paymentType,
    workstart: number,
    workend: number,
    workdays: days[] 
}