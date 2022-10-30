import { Component, OnInit } from '@angular/core';
import { ControlContainer, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { days } from '../days';
import { paymentType } from '../paymentType';
import { moneyUser } from '../moneyuser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  public payType = paymentType
  public daysOfWeek = days
  public keys: string[] = Object.keys(this.daysOfWeek)
  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    initialCash: [0],
    paymentType: [paymentType, Validators.required],
    pay: [0, Validators.required],
    workstart: [0],
    workend: [0],
    workdays: this.fb.array([])
  })


  ngOnInit(): void {
    this.buildWorkdayForm()
    this.getDaysArray()
  }

  get workdays() {
    return this.userForm.get("workdays") as FormArray
  }

  buildWorkdayForm() {
    this.keys.forEach((key, i) => {
      const fg = this.fb.group({})
      fg.addControl(key, this.fb.control(false))
      this.workdays.push(fg)
      console.log(fg)
      }
    )
  }

  getDaysArray(): days[] {
    const selectedWorkdays = this.workdays.controls.filter((days, i) => days.value[this.keys[i]])
    const dayValues: days[] = selectedWorkdays.map(day => {
      const userday = Object.keys(day.value)[0] as keyof typeof days
      return days[userday]
    })
    return dayValues
  }

  submit(){
    /* User Service will go here */
    const username: string = this.userForm.get('username')?.value
    const paymentType: paymentType = this.userForm.get('paymentType')?.value
    const initialCash: number = this.userForm.get('initialCash')?.value
    const pay: number = this.userForm.get('pay')?.value
    const workstart: number = this.userForm.get('workstart')?.value
    const workend: number = this.userForm.get('workend')?.value
    const workdays: days[] = this.getDaysArray();
    const user: moneyUser = {
      username: username,
      paymentType: paymentType,
      money: initialCash,
      pay: pay,
      workstart: workstart,
      workend: workend,
      workdays: workdays
    }
    console.log(user)
  }
}
