import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Theme } from "../../models/theme";
import { ThemeService } from "../../services/themes.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/catch";
import { Route } from "@angular/compiler/src/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-theme",
  templateUrl: "./edit-theme.component.html",
  styleUrls: ["./edit-theme.component.css"]
})
export class EditThemeComponent implements OnInit {
  id: string;
  constructor(
    private themeService: ThemeService,
    private flashService: FlashMessagesService,
    private router: Router,
    public authService: AuthService,
    private route: ActivatedRoute
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;

    this.router.navigate(["/login"]);
    return false;
  }
  theme: Theme = {
    id: "",
    name: ""
  };
  errorNom = false;
  valueNom = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.themeService.getTheme(this.id).subscribe(theme => {
      this.theme = theme.data;

    });
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  onEditTheme({ value, valid }: { value: Theme; valid: boolean }) {
    console.log(value);
    let error;
    this.id = this.route.snapshot.params["id"];

    if (valid) {
      this.themeService.editTheme(this.id, value).subscribe(
        themeData => {
          if (themeData.success) {

            this.router.navigate(["/themes"]);
          }
        },
        error => {
          if (error.error.error = "Valeurs en double entrées") {
            this.flashService.show("Theme avec ce nom déja ajouté", {
              cssClass: "alert-danger",
              timeout: 3000
            })
          } else {
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            })
          }
        }
      );
    } else {

      if (!value.name) {
        this.errorNom = true;

      }
    }
  }
}
