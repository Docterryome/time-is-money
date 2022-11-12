import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MakeMoneyComponent } from './make-money/make-money.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  {path: 'money', component: MakeMoneyComponent},
  {path: '', component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
