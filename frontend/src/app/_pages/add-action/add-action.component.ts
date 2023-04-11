import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActionApiService } from 'src/app/_api/services';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {
  repeat : string = 'once';
  executeDateTime = '';
  durationSeconds = 0;
  workerId: string | null = null;
  hubId: string | null = null;

  repeats = [
    {id: 'once', name: "Once"},
    {id: 'daily', name: "Daily"},
    {id: 'weekly', name: "Weekly"},
    {id: 'monthly', name: "Monthly"},
    {id: 'yearly', name: "Yearly"}
 ];

  constructor(
    private actionApiService: ActionApiService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.workerId = this.route.snapshot.paramMap.get('workerId');
    this.hubId = this.route.snapshot.paramMap.get('id');
  }
  

  toRepeatEnum(s : string) : 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly' {
    switch (s) {
      case "once":
        return "once";
      case "daily":
        return "daily";
      case "weekly":
            return 'weekly';
      case "monthly":
              return 'monthly';
              case "yearly":
                return 'yearly';
        default:
        return 'once';
    }
  }

  addAction() {
    this.actionApiService
      .actionControllerCreate({ workerId: this.workerId!, body: {repeat: this.toRepeatEnum(this.repeat), executeDateTime: this.executeDateTime , durationSeconds: this.durationSeconds} })
      .subscribe({
        next: (res) => {
          this.toastService.success('Action created successfully');
          this.router.navigate(['hub', this.hubId!, 'worker', this.workerId!]);
        },
      });
  }

}





