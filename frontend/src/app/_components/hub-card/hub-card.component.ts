import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private toastService: ToastrService,
    private modalService: NgbModal
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

  deleteHub(content: TemplateRef<any>) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'delete') {
          this.apiService
            .hubControllerUnRegister({ id: this.hub.id })
            .subscribe((res) => {
              this.toastService.success('Hub deleted');
            });
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
}
