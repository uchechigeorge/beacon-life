import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-content-header',
  templateUrl: './modal-content-header.component.html',
  styleUrls: ['./modal-content-header.component.scss'],
})
export class ModalContentHeaderComponent implements OnInit {

  @Input() title: string = '';

  constructor() { }

  ngOnInit() {}

}
