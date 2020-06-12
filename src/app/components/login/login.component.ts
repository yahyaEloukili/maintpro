import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";
import { FileDetector } from "protractor";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { User } from "../../models/user";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user = {
    email: "",
    password: ""
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: ValidateService,
    private flashService: FlashMessagesService
  ) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }
  }
  onLoginSubmit({ value, valid }: { value: any; valid: boolean }) {
    this.authService.authUser(value).subscribe(
      data => {

        if (valid && data.success) {

          if (data.user.from && data.user.to) {
            if ((new Date(data.user.from).getTime() <= new Date().getTime()) && (new Date(data.user.to).getTime() >= new Date().getTime())) {
              this.authService.storeUserData(data, new Date(data.user.to).getTime() - new Date().getTime());

              this.router.navigate(['/questions'])
                .then(() => {
                  window.location.reload();
                });

            }
            else {
              this.flashService.show("Non autorisé", {
                cssClass: "alert-danger",
                timeout: 3000
              })
            }
          } else if (data.user.from && !data.user.to) {
            if ((new Date(data.user.from).getTime() <= new Date().getTime())) {
              this.authService.storeUserData(data, 22 * 24 * 60 * 60 * 1000);

              this.router.navigate(['/questions'])
                .then(() => {
                  window.location.reload();
                });

            }
            else {
              this.flashService.show("Non autorisé", {
                cssClass: "alert-danger",
                timeout: 3000
              })
            }
          } else if (data.user.to && !data.user.from) {
            if ((new Date(data.user.to).getTime() >= new Date().getTime())) {
              this.authService.storeUserData(data, new Date(data.user.to).getTime() - new Date().getTime());

              this.router.navigate(['/questions'])
                .then(() => {
                  window.location.reload();
                });

            }
            else {

              this.flashService.show("Non autorisé", {
                cssClass: "alert-danger",
                timeout: 3000
              })
            }
          } else {
            console.log("object");
            this.authService.storeUserData(data, 22 * 24 * 60 * 60 * 1000);
            this.router.navigate(['/questions'])
              .then(() => {
                window.location.reload();
              });
          }



        }
      },
      error => {

        this.flashService.show(error.error.error, {
          cssClass: "alert-danger",
          timeout: 3000
        })
      }
    );
  }
  setRole(ev) {

  }
  onResetClicked() {
    this.router.navigate(["/resetPassword"]);
  }
}
