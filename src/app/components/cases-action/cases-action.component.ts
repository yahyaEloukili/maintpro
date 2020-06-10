// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cases-action',
//   templateUrl: './cases-action.component.html',
//   styleUrls: ['./cases-action.component.css']
// })
// export class CasesActionComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-question-action',
//   templateUrl: './question-action.component.html',
//   styleUrls: ['./question-action.component.css']
// })
// export class QuestionActionComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

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
  selector: 'app-question-action',
  templateUrl: './cases-action.component.html',
  styleUrls: ['./cases-action.component.css']
})
export class CasesActionComponent implements OnInit, ICellRendererAngularComp {
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

    this.router.navigate([`/editCase/${this.cellValue}`]);

  }
  onDetailClicked(ev) {
    {
      this.router.navigate([`/case/${this.cellValue}`]);

    }
  }

}
