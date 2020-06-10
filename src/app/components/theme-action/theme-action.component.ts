// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-theme-action',
//   templateUrl: './theme-action.component.html',
//   styleUrls: ['./theme-action.component.css']
// })
// export class ThemeActionComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ThemeService } from 'src/app/services/themes.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'theme-action-cell3',
  templateUrl: './theme-action.component.html',
  styleUrls: ['./theme-action.component.css']
})
export class ThemeActionComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;

    return true;
  }
  onClickEdit(ev) {

    this.router.navigate([`/editTheme/${this.cellValue}`]);

  }

}
