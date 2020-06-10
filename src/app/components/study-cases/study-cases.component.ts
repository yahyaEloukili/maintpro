
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
import { StudyCaseService } from 'src/app/services/study-case.service';
import { CasesActionComponent } from '../cases-action/cases-action.component';
import { ThemeCaseComponent } from '../theme-case/theme-case.component';
import { MetierService } from 'src/app/services/metiers.service';
import { ThemeService } from 'src/app/services/themes.service';
@Component({
  selector: 'app-studyCases',
  templateUrl: './study-cases.component.html',
  styleUrls: ['./study-cases.component.css']
})
export class StudyCasesComponent implements OnInit {
  questions: any[];
  vars: any[][];
  profile: any;
  @ViewChild("agGrid", { static: false }) agGrid: AgGridAngular;
  frameworkComponents;
  columnDefs;
  gridApi
  gridColumnApi;
  value;
  metiers: import("c:/Users/T440/Desktop/MaintPro/maintpro/src/app/models/metiers").Metier[];
  themes: Theme[];

  constructor(private studyCaseService: StudyCaseService,
    private excelService: ExcelService,
    private metierService: MetierService,
    private questionService: QuestionService,
    private themeService: ThemeService,
    private flashMessage: FlashMessagesService,
    private router: Router, ) { }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.studyCaseService.getCases().subscribe(questions => {

      params.api.setRowData(questions.data);


    })
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
  }
  exportAsXLSX() {
    this.studyCaseService.getCases().subscribe(questions => {
      this.excelService.exportAsExcelFile(questions.data, 'study cases');
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
    this.studyCaseService.getCasesofmetier(ev).subscribe(questions => {
      this.agGrid.api.setRowData(questions.data);
    })

  }
  ngOnInit(): void {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes.data;
    })
    this.frameworkComponents = {
      id: CasesActionComponent,
      metier: ThemeCaseComponent

    }
    this.studyCaseService.getCases().subscribe(cases => {

      console.log(cases.data);
      this.vars = cases.data.map(el => Object.values((el)));


    });
    this.columnDefs = [
      { headerName: 'Titre', field: "title", sortable: true, filter: true, checkboxSelection: true, width: 150 },
      { headerName: 'Problemeatique', field: "Problematic", sortable: true, filter: true, width: 250 },
      { headerName: 'Métier - Théme', field: "metierId", sortable: true, filter: true, width: 150, cellRenderer: "metier" },


      { headerName: 'Actions', field: "id", width: 100, cellRenderer: "id" }


    ];
  }
  onDeleteClick() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delayData = selectedData.map(node => node.id);

    if (selectedData.length !== 0) {
      if (confirm('Tu est sur de vouloir supprimer ces etudes de cas?')) {
        selectedData.forEach(element => {
          this.studyCaseService.deleteCase(element.id).subscribe(() => {
            this.studyCaseService.getCases().subscribe(cases => {
              this.agGrid.api.setRowData(cases.data);
            })
          });

        });

      }
    }
    else {
      alert('Merci de choisir les etudes de cas à supprimer !');
    }


  }
  onAddButtonClick() {
    this.router.navigate([`/addCase`]);
  }

}
