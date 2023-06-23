import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projekt_am';

  constructor(private authsvr: AuthService) {}

  userIsLogged(): boolean {
    return this.authsvr.userIsLogged()
  }

  currentUser(): string {
    return this.authsvr.currentUser()
  }
}
