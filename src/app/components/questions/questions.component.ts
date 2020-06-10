// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-questions',
//   templateUrl: './questions.component.html',
//   styleUrls: ['./questions.component.css']
// })
// export class QuestionsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { Theme } from 'src/app/models/theme';
import { QuestionService } from 'src/app/services/questions.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ExcelService } from '../../services/excel.service';
import { ThemeActionComponent } from '../theme-action/theme-action.component';

import { UserOptions } from 'jspdf-autotable';

import { Router } from '@angular/router';
import { QuestionActionComponent } from '../question-action/question-action.component';
import { ThemeQuestionComponent } from '../theme-question/theme-question.component';
import { ThemeService } from 'src/app/services/themes.service';
import { Metier } from 'src/app/models/metiers';
import { MetierService } from 'src/app/services/metiers.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: any[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;
  metiers: Metier[];
  themes: Theme[];

  constructor(private questionService: QuestionService,
    private excelService: ExcelService,
    private themeService: ThemeService,
    private metierService: MetierService,
    private flashMessage: FlashMessagesService,
    private router: Router, ) { }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.questionService.getQuestions().subscribe(questions => {

      params.api.setRowData(questions.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  exportAsXLSX() {
    this.questionService.getQuestions().subscribe(questions => {
      this.excelService.exportAsExcelFile(questions.data, 'questions');
    })
  }
  onBtnExport(): void {

    const params = {
      columnGroups: true,
      columnKeys: ['name', 'delay'],
      fileName: 'Categories',
      columnSeparator: ','
    };
    console.log('excel');
    this.gridApi.exportDataAsCsv(params);
  }
  downloadAsPDF() {
    const doc = new jsPDF('portrait', 'px', 'a4');

    doc.autoTable({
      head: [['Id', 'Nom']],
      body: this.vars
    });
    doc.save("table.pdf");
  }
  themeClicked(ev) {
    console.log(ev);
    this.metierService.getMetiersofTheme(ev).subscribe(metiers => {
      this.metiers = metiers.data;

    })

  }
  metierClicked(ev) {
    this.questionService.getQuestionsofmetier(ev).subscribe(questions => {
      this.agGrid.api.setRowData(questions.data);
    })

  }

  ngOnInit(): void {
    this.frameworkComponents = {
      id: QuestionActionComponent,
      metier: ThemeQuestionComponent

    }
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes.data;
    })
    this.questionService.getQuestions().subscribe(questions => {


      this.vars = questions.data.map(el => Object.values((el)));


    });

    this.columnDefs = [
      { headerName: 'Question', field: "text", sortable: true, filter: true, checkboxSelection: true, width: 300 },
      { headerName: 'Métier - Théme', field: "metierId", sortable: true, filter: true, width: 150, cellRenderer: "metier" },

      // { headerName: 'Métier', field: "metier_nom", sortable: true, filter: true, width: 100 },


      { headerName: 'Actions', field: "id", width: 80, cellRenderer: "id" }


    ];
  }
  onDeleteClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces questions?')) {
        selectedData.forEach(element => {
          this.questionService.deleteQuestion(element.id).subscribe(() => {
            this.questionService.getQuestions().subscribe(themes => {
              this.agGrid.api.setRowData(themes.data);
            })
          });

        });

      }
    }
    else {
      alert('Merci de choisir les themes à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addQuestion`]);
  }

}
