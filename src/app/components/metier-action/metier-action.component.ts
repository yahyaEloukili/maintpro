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
import { MetierService } from 'src/app/services/metiers.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'metier-action',
  templateUrl: './metier-action.component.html',
  styleUrls: ['./metier-action.component.css']
})
export class MetierActionComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private metierService: MetierService,
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

    this.router.navigate([`/editMetier/${this.cellValue}`]);

  }

}
