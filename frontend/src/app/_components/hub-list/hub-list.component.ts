import { Component, OnInit } from '@angular/core';
import { Hub } from 'src/app/_api/models';
import { HubApiService } from 'src/app/_api/services';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-hub-list',
  templateUrl: './hub-list.component.html',
  styleUrls: ['./hub-list.component.css'],
})
export class HubListComponent implements OnInit {
  constructor(
    public userService: UserService,
    private hubApiService: HubApiService
  ) {}
  hubs: Hub[] = [];
  ngOnInit(): void {
    this.hubApiService.hubControllerFindAll().subscribe({
      next: (res) => {
        this.hubs = res;
      },
    });
  }
}
