import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Worker } from 'src/app/_api/models';
import { WorkerApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  constructor(
    public userService: UserService,
    private workerApiService: WorkerApiService,
    private route: ActivatedRoute
  ) {}
  hubId: string | null = null;
  workers: Worker[] = [];

  ngOnInit(): void {
    this.hubId = this.route.snapshot.paramMap.get('id');
    
    if (this.hubId) {
      this.workerApiService.workerControllerFindAll({ id: this.hubId}).subscribe({
        next: (res) => {
          this.workers = res;
        },
      }); 
    }
  }

}


