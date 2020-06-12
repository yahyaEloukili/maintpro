import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { User } from "../../models/user";


import { UserService } from "../../services/user.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";

import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  user: User = {
    id: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    matricule: "",
    role: "",
    from: "",
    to: ""
  };

  errorNom = false;
  valueNom = false;
  errorPrenom = false;
  valuePrenom = false;
  errorEmail = false;
  valueEmail = false;
  errorRole = false;
  valueRole = false;
  errorZone = false;
  valueZone = false;
  adding: boolean = false;

  zoneId: string;
  role: string;
  zones: any[];
  indice: any;
  hidden: boolean;
  constructor(

    private userService: UserService,
    private flashService: FlashMessagesService,
    public authService: AuthService,
    private router: Router
  ) { }
  onLogoutClick() {
    this.authService.logout();
    // this.authService.setAuth(false);
    // this.authorized = this.authService.auth;
    this.flashService.show("you are loged out", {
      cssClass: "alert-success",
      timeout: 3000
    });
    this.router.navigate(["/login"]);
    return false;
  }
  ngOnInit(): void {
    this.hidden = true;
  }
  clickNom(ev) {
    this.valueNom = true;
  }
  clickPrenom(ev) {
    this.valuePrenom = true;
  }
  clickEmail(ev) {
    this.valueEmail = true;
  }
  clickRole(ev) {
    this.valueRole = true;
  }
  clickZone(ev) {
    this.valueZone = true;
  }
  onAddUser(form: NgForm) {
    this.adding = true;
    let error;
    if (form.valid) {

      form.value.role = this.role;
      if (!form.value.from) {
        form.value.from = null;
      }
      if (!form.value.to) {
        form.value.to = null;
      }
      this.userService.addUser(form.value).subscribe(
        userData => {
          if (userData.success) {
            this.adding = false;


          }
          this.router.navigate(["/users"]);
        },
        error => {
          this.adding = false;
          if (error.error.error === 'Valeurs en double entrées') {
            this.adding = false;
            this.flashService.show("Cette adresse email est déjà utilisée.", {
              cssClass: "alert-danger",
              timeout: 3000
            })
          } else {
            this.adding = false;
            this.flashService.show(error.error.error, {
              cssClass: "alert-danger",
              timeout: 3000
            })
          }
        }
      );
    } else {
      this.adding = false;
      if (!form.value.nom) {
        this.errorNom = true;
        this.adding = false;

      }
      if (!form.value.prenom) {
        this.errorPrenom = true;
        this.adding = false;

      }
      if (!form.value.email) {
        this.adding = false;
        this.errorEmail = true;

      }
      if (!form.value.role) {
        this.adding = false;
        this.errorRole = true;

      }

    }
  }

  setRole(ev) {

    this.role = ev;
    if (ev === 'admin') {

    }
    else {

    }
  }
}
