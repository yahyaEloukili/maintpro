import { Component, Inject } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Router } from '@angular/router';
import { ValidateService } from './services/validate.service';
import { FlashMessagesService } from "angular2-flash-messages";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "angular-src";

  user: string;
  appareilService: any;
  agGrid: any;

  //  @Output() authorized: EventEmitter<any> = new EventEmitter();
  constructor(

    private router: Router,
    public authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService,

  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  ngOnInit(): void {
    this.authService.loadUser();
    if (this.authService.user) { this.user = this.authService.user.nom; }
  }
  refrech(ev) {
    this.appareilService.getAppareils().subscribe(appreils => {
      ev.api.setRowData(appreils.data);
    })
  }
}
