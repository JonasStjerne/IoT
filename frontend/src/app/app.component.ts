import { Component, HostListener } from '@angular/core';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  constructor(private userService: UserService) {}

  @HostListener('window:unload')
  private onUnload(): void {
    this.userService.saveTokenToLocalStorage();
  }

  ngOnInit() {
    this.userService.loadTokenFromLocalStorage();
  }
}
