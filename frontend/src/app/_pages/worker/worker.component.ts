import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Action } from 'src/app/_api/models';
import { ActionApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  workerId: string | null = null;
  

  constructor(
    private actionApiService: ActionApiService,
    private toastService: ToastrService,
    private route: ActivatedRoute,) { }

    actions: Action[] = [];

  ngOnInit(): void {
    this.workerId = this.route.snapshot.paramMap.get('workerId');
    
    if (this.workerId) {
      this.actionApiService.actionControllerFindAll({ id: this.workerId}).subscribe({
        next: (res) => {
          this.actions = res;
        },
      }); 
    }
  }
 
  instantAction() {
    this.actionApiService
      .actionControllerSendInstantAction ({ workerId: this.workerId! })
      .subscribe({
        next: (res) => {
          this.toastService.success('Instant action activated');
        },
      });
  }

}

