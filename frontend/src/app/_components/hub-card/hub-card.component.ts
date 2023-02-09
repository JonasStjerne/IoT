import { Component, Input, OnInit } from '@angular/core';
import { Hub } from 'src/app/_api/models';

@Component({
  selector: 'app-hub-card',
  templateUrl: './hub-card.component.html',
  styleUrls: ['./hub-card.component.css'],
})
export class HubCardComponent implements OnInit {
  @Input() hub!: Hub;

  constructor() {}

  ngOnInit(): void {}

  changeName() {}
}
