


import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp, AgGridAngular } from 'ag-grid-angular';
import { ThemeService } from '../../services/themes.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MetierService } from 'src/app/services/metiers.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-question-action',
  templateUrl: './theme-question.component.html',
  styleUrls: ['./theme-question.component.css']
})
export class ThemeQuestionComponent implements OnInit, ICellRendererAngularComp {
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;

  cellValue;
  metier: string;
  theme: string;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private metierService: MetierService,
    private themeService: ThemeService,
    private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {

  }
  agInit(params: any) {

    this.cellValue = params.value;
    this.metierService.getMetier(this.cellValue).subscribe(metier => {
      this.metier = metier.data.name;
      this.themeService.getTheme(metier.data.themeId).subscribe(theme => {
        this.theme = theme.data.name;
      })
    })

  }
  refresh(params: any): boolean {
    this.cellValue = params.value;
    this.metierService.getMetier(this.cellValue).subscribe(metier => {
      this.metier = metier.data.name;
    })

    return true;
  }


}
