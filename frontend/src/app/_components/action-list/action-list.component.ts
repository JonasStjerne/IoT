import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'src/app/_api/models';
import { ActionApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.css']
})
export class ActionListComponent implements OnInit {
  constructor(
    public userService: UserService,
    private actionApiService: ActionApiService,
    private route: ActivatedRoute
  ) {}
  workerId: string | null = null;
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

}





