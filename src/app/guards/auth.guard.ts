import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }
  canActivate() {
    if (this.authService.loggedIn() && this.authService.user.role === "admin") {
      return true;
    } else if (
      this.authService.loggedIn() &&
      this.authService.user.role !== "admin"
    ) {
      this.flashMessage.show(
        "Seule l'administrateur a le droit d'acceder a ce site",
        {
          cssClass: "alert-danger",
          timeout: 3000
        }
      );
      this.router.navigate(["/login"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
