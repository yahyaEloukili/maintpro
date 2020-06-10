import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Theme } from "../../models/theme";
import { ThemeService } from "../../services/themes.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-add-theme",
  templateUrl: "./add-theme.component.html",
  styleUrls: ["./add-theme.component.css"]
})
export class AddThemeComponent implements OnInit {
  // @ViewChild("file") file: ElementRef;
  theme: Theme = {
    id: "",
    name: ""
  };
  errorNom = false;
  valueNom = false;
  constructor(
    private themeService: ThemeService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }

  clickNom(ev) {
    this.valueNom = true;
  }
  onAddCategorie(form: NgForm) {
    let error;
    if (form.valid) {
      this.themeService.addTheme(form.value).subscribe(
        themeData => {
          if (themeData.success) {
            this.router.navigate(['/themes']);
          }
        },
        error => {
          if (error.error.error === "Valeurs en double entrées") {
            this.flashService.show("theme deja ajouté avec ce nom", {
              cssClass: "alert-danger",
              timeout: 3000
            });
          } else {
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            });
          }
        }
      );
    } else {


      if (!form.value.name) {
        this.flashService.show("Merci d'entrer le nom", {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.errorNom = true;

      }
    }
  }

  ngOnInit(): void { }
}
