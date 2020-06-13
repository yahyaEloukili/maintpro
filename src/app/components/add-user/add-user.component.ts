import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from "@angular/core";
import { User } from "../../models/user";


import { UserService } from "../../services/user.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import "rxjs/add/operator/catch";

import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import * as _moment from 'moment';
import {unitOfTime} from 'moment';
import {DateButton, DlDateTimePickerChange} from 'angular-bootstrap-datetimepicker';
let moment = _moment;

if ('default' in _moment) {
  moment = _moment['default'];
}
declare const $;
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
  selectedDateFrom: any;
  selectedDateTo: any;
  today = new Date();
  disablePastDates = true;
  constructor(
    private _elementRef: ElementRef,
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
      if (!this.selectedDateFrom) {
        form.value.from = null;
      } else {
        form.value.from = this.selectedDateFrom;
      }
      if (!this.selectedDateTo) {
        form.value.to = null;
      } else {
        form.value.to = this.selectedDateTo;
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
  startDateInputFilter = (value: (number | null | undefined)) => {
    return this.startDatePickerFilter({value} as DateButton, 'minute');
  }
  startDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    return true
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  }
  //////////////////////////// dateTimeLogic //////////////////////////////////
}
