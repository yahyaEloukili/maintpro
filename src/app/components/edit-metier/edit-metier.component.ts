// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-edit-metier',
//   templateUrl: './edit-metier.component.html',
//   styleUrls: ['./edit-metier.component.css']
// })
// export class EditMetierComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Metier } from "../../models/metiers";
import { Theme } from "../../models/theme";
import { MetierService } from "../../services/metiers.service";
import { ThemeService } from "../../services/themes.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/catch";
import { Route } from "@angular/compiler/src/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-edit-metier",
  templateUrl: "./edit-metier.component.html",
  styleUrls: ["./edit-metier.component.css"]
})
export class EditMetierComponent implements OnInit {
  id: string;
  themeId: any;
  themes: any[];
  constructor(
    private metierService: MetierService,
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
  metier: Metier = {
    id: "",
    name: "",
    themeId: ""
  };
  errorNom = false;
  valueNom = false;
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes.data;

    })
    this.metierService.getMetier(this.id).subscribe(metier => {
      this.metier = metier.data;

    });
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  onEditMetier({ value, valid }: { value: Metier; valid: boolean }) {
    console.log(value);
    let error;
    this.id = this.route.snapshot.params["id"];
    value.themeId = this.themeId;
    if (valid) {
      this.metierService.editMetier(this.id, value).subscribe(
        themeData => {
          if (themeData.success) {

            this.router.navigate(["/metiers"]);
          }
        },
        error => {

          this.flashService.show(error.error.error, {
            cssClass: "alert-danger",
            timeout: 3000
          })

        }
      );
    } else {

      if (!value.name) {
        this.errorNom = true;

      }
    }
  }
  setTheme(ev) {
    this.themeId = ev;


  }
}
