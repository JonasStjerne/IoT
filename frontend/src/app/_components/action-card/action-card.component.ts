import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Worker, Action } from 'src/app/_api/models';
import { ActionApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css']
})
export class ActionCardComponent implements OnInit {
  @Input() action!: Action; 
  @Input() workerId!:Worker['id'];
  constructor(
    private actionApiService: ActionApiService,
    private toastService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  changeName() {
    this.actionApiService
      .actionControllerUpdate({id: this.action.id, body: {} })
      .subscribe((res) => {
        this.toastService.success('Action name changed');
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







  
 






  

