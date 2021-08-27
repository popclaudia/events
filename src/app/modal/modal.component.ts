import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() name: any;
  @Input() description: any;
  @Input() period: any;
  @Input() image: any;
  @Input() location: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}

