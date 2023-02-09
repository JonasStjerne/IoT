import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Hub } from 'src/app/_api/models';
import { ApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-hub-card',
  templateUrl: './hub-card.component.html',
  styleUrls: ['./hub-card.component.css'],
})
export class HubCardComponent implements OnInit {
  @Input() hub!: Hub;
  constructor(
    private apiService: ApiService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {}

  changeName() {
    this.apiService
      .hubControllerRename({ id: this.hub.id, body: { name: this.hub.name } })
      .subscribe((res) => {
        this.toastService.success('Hub name changed');
        console.log(res);
      });
  }
}
