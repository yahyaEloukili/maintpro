// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-add-metier',
//   templateUrl: './add-metier.component.html',
//   styleUrls: ['./add-metier.component.css']
// })
// export class AddMetierComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Metier } from "../../models/metiers";
import { MetierService } from "../../services/metiers.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

import { ThemeService } from 'src/app/services/themes.service';

@Component({
  selector: "app-add-metier",
  templateUrl: "./add-metier.component.html",
  styleUrls: ["./add-metier.component.css"]
})
export class AddMetierComponent implements OnInit {
  // @ViewChild("file") file: ElementRef;
  metier: Metier = {
    id: "",
    name: "",
    themeId: ""
  };
  themeId: any;
  errorAppareil: boolean;
  errorNom = false;
  themes: any[];
  valueNom = false;
  errorTheme: boolean;
  valueTheme: boolean;
  constructor(
    private metierService: MetierService,
    private themeService: ThemeService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }

  clickNom(ev) {
    this.valueNom = true;
  }
  setTheme(ev) {
    this.themeId = ev;
  }

  onAddMetier(form: NgForm) {
    let error;
    if (form.valid) {
      form.value.themeId = this.themeId;
      this.metierService.addMetier(form.value).subscribe(
        themeData => {
          if (themeData.success) {
            this.router.navigate(['/metiers']);
          }
        },
        error => {
          if (error.error.error === "Valeurs en double entrées") {
            this.flashService.show("metier deja ajouté avec ce nom", {
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

      if (!this.themeId) {

        this.errorTheme = true;

      }
      else {

        this.errorTheme = false;
      }
    }
  }
  clickTheme(ev) {
    this.valueTheme = true;
  }
  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themeData => {
      this.themes = themeData.data;
      // appareilData.data.forEach(element => {
      //   this.appareils.push(element.id);
      // })



    });



  }

}
