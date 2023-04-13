import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Hub, Worker } from 'src/app/_api/models';
import { WorkerApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-worker-card',
  templateUrl: './worker-card.component.html',
  styleUrls: ['./worker-card.component.css'],
})
export class WorkerCardComponent implements OnInit {
  @Input() worker!: Worker;
  @Input() hubId!: Hub['id'];
  constructor(
    private workerApiService: WorkerApiService,
    private toastService: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  changeName() {
    this.workerApiService
      .workerControllerRename({
        hubId: this.hubId,
        id: this.worker.id,
        body: { name: this.worker.name },
      })
      .subscribe((res) => {
        this.toastService.success('Worker name changed');
      });
  }
  deleteWorker(content: TemplateRef<any>) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'delete') {
          this.workerApiService
            .workerControllerRemove({ id: this.worker.id })
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
