import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeMoneyComponent } from './make-money.component';

describe('MakeMoneyComponent', () => {
  let component: MakeMoneyComponent;
  let fixture: ComponentFixture<MakeMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
