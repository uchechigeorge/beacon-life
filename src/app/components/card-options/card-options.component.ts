import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss'],
})
export class CardOptionsComponent implements OnInit {

  @Input() icon = '';
  @Input() text= '';
  @Input() active: boolean = true;

  constructor() { }

  ngOnInit() {}

}
