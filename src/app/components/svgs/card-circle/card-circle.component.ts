import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-circle',
  templateUrl: './card-circle.component.html',
  styleUrls: ['./card-circle.component.scss'],
})
export class CardCircleComponent implements OnInit {

  @Input() circle: string = 'normal'; 

  constructor() { }

  ngOnInit() {}

}
