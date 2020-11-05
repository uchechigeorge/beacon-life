import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent implements OnInit {

  @Input() title: string = '';
  @Input() showIcon: boolean = true;
  @Output() dismissEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  dismiss() {
    this.dismissEvent.emit();
  }

}
