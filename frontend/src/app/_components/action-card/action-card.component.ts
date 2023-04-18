import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Action, Worker } from 'src/app/_api/models';
import { ActionApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css'],
})
export class ActionCardComponent {
  @Input() action!: Action;
  @Input() workerId!: Worker['id'];
  @Output() actionDeleted = new EventEmitter<string>();

  repeats = [
    { id: 'once', name: 'Once' },
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yealy', name: 'Yearly' },
  ];

  constructor(
    private actionApiService: ActionApiService,
    private toastService: ToastrService,
    private modalService: NgbModal
  ) {}

  changeName() {
    this.actionApiService
      .actionControllerUpdate({
        id: this.action.id,
        body: {
          durationSeconds: this.action.durationSeconds,
          executeDateTime: this.action.executeDateTime,
          repeat: this.action.repeat,
        },
      })
      .subscribe((res) => {
        this.toastService.success('Action changed');
        console.log(res);
      });
  }
  deleteAction(content: TemplateRef<any>) {
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'delete') {
          this.actionApiService
            .actionControllerRemove({ id: this.action.id })
            .subscribe((res) => {
              this.actionDeleted.emit(res.id);
              this.toastService.success('Action deleted');
            });
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
}
