import { Component, OnInit } from '@angular/core';
import { ITransactionCard } from 'src/app/models/app-pages-model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  public TransactionCards: ITransactionCard[] = [
    {
      type: 'success',
      transactionType: 'Funded Card',
      amount: 500,
      cardHolder: 'Adebayo Success',
      date: '10/10/2020'
    },
    {
      type: 'danger',
      transactionType: 'PS Game Purchase',
      amount: 50,
      cardHolder: 'Adebayo Success',
      date: '25/10/2020'
    },
    {
      type: 'danger',
      transactionType: 'Binary Deposit',
      amount: 200,
      cardHolder: 'Adebayo Success',
      date: '30/10/2020'
    },
    {
      type: 'success',
      transactionType: 'Binary Withdrawal',
      amount: 1200,
      cardHolder: 'Adebayo Success',
      date: '19/12/2020'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
