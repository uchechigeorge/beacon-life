import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {

  @Input() cardType: string = 'success';

  @Input() transcationTypeTitle: string = 'Type';
  @Input() transcationType: string = '';

  @Input() cardHolderTitle: string = 'Cardholder name';
  @Input() cardHolder: string = '';

  @Input() amountTitle: string = 'Amount';
  @Input() amount: string = '';

  @Input() dateTitle: string = 'Date';
  @Input() date: string = '';


  constructor() { }

  ngOnInit() {}

}
